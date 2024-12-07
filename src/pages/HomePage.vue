<template>
  <div class="px-4">
    <div class="flex justify-between items-center mt-4">
      <h1 class="text-3xl font-bold">Weather</h1>
    </div>
    <CitySearch/>
    <WeatherCardList/>
  </div>
</template>

<script setup lang="ts">
import {onMounted,onUnmounted} from 'vue';
import {getCurrentPosition} from '@/utils/geolocation';
import {useWeatherStore} from '../store/weatherStore.ts';
import CitySearch from "@/components/organisms/CitySearch.vue";
import WeatherCardList from "@/components/organisms/WeatherCardList.vue";

const weatherStore = useWeatherStore();
let refreshInterval: NodeJS.Timeout;

onMounted(async () => {
  try {
    const { latitude, longitude } = await getCurrentPosition();
    await weatherStore.fetchWeatherData(latitude, longitude);

    // Set interval to refresh weather data every hour
    refreshInterval = setInterval(async () => {
      await weatherStore.fetchWeatherData(latitude, longitude);
    }, 60 * 60 * 1000); // 1 hour in milliseconds
  } catch (error) {
    console.error('Failed to get current position:', error);
  }
});

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

</script>

<style scoped>
</style>