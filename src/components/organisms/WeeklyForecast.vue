<template>
  <div>
    <h1 class="text-xl font-semibold my-4">Weekly Forecast</h1>
    <div class="space-y-4 overflow-y-auto scrollbar-hide touch-auto h-96">
      <WeeklyForecastItem
          v-for="(day, index) in weeklyForecast"
          :key="index"
          :date="day.dt"
          :iconUrl="`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`"
          :description="day.weather[0]?.description"
          :temperature="Math.round(day.temp.day)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/store/weatherStore';
import WeeklyForecastItem from '@/components/molecules/WeeklyForecastItem.vue';

const weatherStore = useWeatherStore();
const weatherDetail = computed(() => weatherStore.weatherDetail);

const weeklyForecast = computed(() => {
  return weatherDetail.value?.data?.daily || [];
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