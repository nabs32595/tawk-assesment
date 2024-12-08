<template>
  <TopSection />
  <div class="container mx-auto p-4">
    <HourlyForecast />
    <WeeklyForecast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/store/weatherStore';
import TopSection from '@/components/organisms/TopSection.vue';
import HourlyForecast from '@/components/organisms/HourlyForecast.vue';
import WeeklyForecast from '@/components/organisms/WeeklyForecast.vue';

const weatherStore = useWeatherStore();
const route = useRoute();
const id = route.params.id;

onMounted(() => {
  if (id) {
    weatherStore.setWeatherDetail(id);
  }
});
</script>