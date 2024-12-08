<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">Hourly Forecast</h1>
    <div class="flex space-x-4 overflow-x-auto scrollbar-hide touch-auto">
      <HourlyForecastItem
          v-for="(hour, index) in hourlyForecast"
          :key="index"
          :date="hour.dt"
          :iconUrl="`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}@2x.png`"
          :description="hour.weather[0]?.description"
          :temperature="Math.round(hour.temp)"
          class="flex-none w-1/4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/store/weatherStore';
import HourlyForecastItem from '@/components/molecules/HourlyForecastItem.vue';

const weatherStore = useWeatherStore();
const weatherDetail = computed(() => weatherStore.weatherDetail);

const hourlyForecast = computed(() => {
  return weatherDetail.value?.data?.hourly || [];
});
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.touch-auto {
  touch-action: auto;
}
</style>