import {defineStore} from 'pinia';
import axios from 'axios';
import {saveWeatherData, getAllWeatherData, getWeatherDataById, deleteWeatherDataById} from '@/utils/db';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        cities: [] as Array<{ id: number; name: string; country: string; lat: number; lon: number }>,
        weatherData: [] as any[],
        weatherDetail: null as any,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchWeatherData(lat: number, lon: number, city: string, state: string, country: string, currentLocation: boolean = false) {
            try {
                const cacheKey = city;
                const cachedData = await getAllWeatherData();

                if (!cachedData.some(data => data.id === cacheKey)) {
                    this.loading = true;
                    const {data} = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
                        params: {
                            lat,
                            lon,
                            lang: 'en',
                            units: 'metric',
                            exclude: 'minutely,alerts',
                            appid: API_KEY,
                        },
                    });

                    await saveWeatherData(cacheKey, data, lat, lon, city, state, country, currentLocation);
                    this.weatherData = await getAllWeatherData();
                    this.loading = false;
                } else {
                    this.weatherData = cachedData;
                    this.loading = false;
                }
            } catch (error) {
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
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                    },
                });

                this.cities = response.data
                    .filter((city: any) => city.addresstype === 'city' || city.addresstype === 'aeroway')
                    .map((city: any) => ({
                        id: `${city.lat}-${city.lon}`,
                        city: city.address?.city || city.address?.aeroway || 'Unknown',
                        country: city.address?.country,
                        state: city.address?.state,
                        lat: parseFloat(city.lat),
                        lon: parseFloat(city.lon),
                    }));
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        },
        async fetchCityDetails(lat: number, lon: number) {
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat,
                        lon,
                        format: 'json',
                    },
                });

                if (response.data && response.data.address) {
                    const {town, city, state, country} = response.data.address;
                    return {
                        town: town,
                        city: city,
                        state: state,
                        country: country,
                    };
                }
            } catch (error) {
                console.error('Error fetching city details:', error);
            }
        },
        async setWeatherDetail(id: any) {
            this.weatherDetail = await getWeatherDataById(id);
        },
        async deleteCity(id: string) {
            this.weatherData = this.weatherData.filter(data => data.id !== id);
            await deleteWeatherDataById(id);
        },
    },
});