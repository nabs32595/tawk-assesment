import { defineStore } from 'pinia';
import axios from 'axios';
import { saveWeatherData, getWeatherData } from '@/utils/db';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEO_TOLERANCE = 0.1; //slightly within 11 km
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        cities: [] as Array<{ id: number; name: string; country: string; lat: number; lon: number }>,
        weatherData: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchWeatherData(lat: number, lon: number) {
            this.loading = true;
            this.error = null;

            try {
                const cacheKey = 'current-location';
                const cachedData = await getWeatherData(cacheKey);

                const now = Date.now();

                // Use cached data if:
                // 1. It exists
                // 2. It's within the geofence range
                // 3. It's not expired
                if (
                    cachedData &&
                    now - cachedData.timestamp < CACHE_EXPIRATION_TIME &&
                    Math.abs(cachedData.lat - lat) <= GEO_TOLERANCE &&
                    Math.abs(cachedData.lon - lon) <= GEO_TOLERANCE
                ) {
                    this.weatherData = cachedData.data;
                    console.log('Using cached weather data:', this.weatherData);
                    return;
                }

                // Fetch new data if cache is not usable
                const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
                    params: {
                        lat,
                        lon,
                        lang: 'en',
                        units: 'metric',
                        exclude: 'minutely,alerts',
                        appid: API_KEY,
                    },
                });

                this.weatherData = response.data;

                // Save new data to cache
                await saveWeatherData(cacheKey, response.data, lat, lon);
            } catch (error) {
                this.error = 'Error fetching weather data';
                console.error('Error fetching weather data:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchCities(query: string) {
            if (query.length < 2) {
                this.cities = [];
                return;
            }

            try {
                const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
                    params: {
                        q: query,
                        limit: 5,
                        appid: API_KEY,
                    },
                });

                this.cities = response.data.map((city: any) => ({
                    id: city.id || `${city.lat}-${city.lon}`,
                    name: city.name,
                    country: city.country,
                    lat: city.lat,
                    lon: city.lon,
                }));

                console.log('cities:', this.cities);
            } catch (error) {
                this.error = 'Error fetching city data';
                console.error(error);
            }
        },
    },
});
