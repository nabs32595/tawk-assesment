<template>
  <div class="flex flex-col gap-3">
    <WeatherCardSkeleton v-if="data.length === 0" v-for="index in 3" :key="'skeleton-' + index" />
    <WeatherCard
        v-else
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :location="card.location"
        :subtitle="card.subtitle"
        :temperature="card.temperature"
        :description="card.description"
        :highTemp="card.highTemp"
        :lowTemp="card.lowTemp"
        @click="navigateToDetails(card.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import WeatherCard from '@/components/molecules/WeatherCard.vue';
import WeatherCardSkeleton from '@/components/molecules/WeatherCardSkeleton.vue';
import { FormatInternationalTime } from '@/utils/time.ts';

const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true,
  },
});

const router = useRouter();

const cards = computed(() => {
  return props.data
      .map(data => ({
        id: data.id,
        title: data.currentLocation ? 'My Location' : null,
        location: data.city,
        subtitle: FormatInternationalTime(data.data.current.dt, data.data.timezone),
        temperature: data.data.current.temp,
        description: data.data.current.weather[0].description,
        highTemp: data.data.daily[0].temp.max,
        lowTemp: data.data.daily[0].temp.min,
        currentLocation: data.currentLocation,
      }))
      .sort((a, b) => b.currentLocation - a.currentLocation);
});

const navigateToDetails = (id: any) => {
  router.push({ name: 'WeatherDetailPage', params: { id } });
};
</script>