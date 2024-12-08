<template>
  <div class="px-4">
    <div
        v-if="!searching"
        class="flex justify-between items-center mt-4 transition-opacity duration-500"
        :class="{'opacity-0 pointer-events-none': searching, 'opacity-100': !searching}"
    >
      <h1 class="text-3xl font-bold">Weather</h1>
      <Icon name="UserIcon" size="w-6 h-6" class="cursor-pointer" @click="goToProfile"/>
    </div>

    <CitySearch @searching="setSearching"/>
    <WeatherCardList
        :data="weatherStore.weatherData"
        v-if="!searching"
        class="transition-opacity duration-500"
        :class="{'opacity-0 pointer-events-none': searching, 'opacity-100': !searching}"
    />
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated} from 'vue';
import {useRouter} from 'vue-router';
import {useWeatherStore} from '../store/weatherStore.ts';
import {getCurrentPosition} from '@/utils/geolocation';
import CitySearch from "@/components/organisms/CitySearch.vue";
import WeatherCardList from "@/components/organisms/WeatherCardList.vue";
import Icon from '@/components/atoms/Icon.vue';

const router = useRouter();
const weatherStore = useWeatherStore();
const searching = ref(false);

const setSearching = (isSearching: boolean) => {
  searching.value = isSearching;
};

const goToProfile = () => {
  router.push({ name: 'profilePage' });
}

const fetchWeather = async () => {
  const {latitude, longitude, city, state, country} = await getCurrentPosition();
  await weatherStore.fetchWeatherData(latitude, longitude, city, state, country, true);
};


onMounted(async () => {
  if (!weatherStore.weatherData.length) {
    await fetchWeather();
  }
});

onActivated(async () => {
  if (!weatherStore.weatherData.length) {
    await fetchWeather();
  }
});

</script>
