<template>
  <div class="my-4">
    <SearchBar @search="onSearch"/>
    <CityList :cities="cities" @citySelected="onCitySelect"/>
  </div>
</template>
<script setup lang="ts">
import CityList from "@/components/molecules/CityList.vue";
import SearchBar from "@/components/molecules/SearchBar.vue";
import { useWeatherStore } from '@/store/weatherStore.ts';

const weatherStore = useWeatherStore();

const onSearch = async (query: string) => {
  await weatherStore.fetchCities(query);
};

const onCitySelect = (city: any) => {
  console.log('Selected city:', city);
};

const cities = weatherStore.cities;

</script>
<style scoped>

</style>