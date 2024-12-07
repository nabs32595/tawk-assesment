<template>
  <div class="flex flex-col gap-3">
    <WeatherCard
        v-for="(card, index) in cards"
        :key="index"
        :location="card.location"
        :subtitle="card.subtitle"
        :temperature="card.temperature"
        :description="card.description"
        :highTemp="card.highTemp"
        :lowTemp="card.lowTemp"
    />
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import WeatherCard from '@/components/molecules/WeatherCard.vue';
import {useWeatherStore} from '@/store/weatherStore';

const weatherStore = useWeatherStore();

const cards = computed(async () => {

  if (!weatherStore.weatherData) return [];
  const {current, daily, timezone} = weatherStore.weatherData;

  return [
    {
      location: timezone,
      subtitle: new Date(current.dt * 1000).toLocaleTimeString(),
      temperature: current.temp,
      description: current.weather[0].description,
      highTemp: daily[0].temp.max,
      lowTemp: daily[0].temp.min,
    },
  ];
});
</script>