<template>
  <div class="bg-blue-500 text-white p-6">
    <NavBar>
      <template #title>
        {{ weatherDetail?.city }}
      </template>
      <template #right-icon>
        <Icon name="TrashIcon" size="w-5 h-5" class="cursor-pointer" @click="deleteCity(weatherDetail?.id)"/>
      </template>
    </NavBar>
    <WeatherInfo
        :date="weatherDetail?.data?.current.dt"
        :iconUrl="`https://openweathermap.org/img/wn/${weatherDetail?.data?.current.weather[0]?.icon}@2x.png`"
        :description="weatherDetail?.data?.current.weather[0]?.description"
        :temperature="Math.round(weatherDetail?.data?.current.temp)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/store/weatherStore.ts';
import NavBar from '@/components/molecules/NavBar.vue';
import WeatherInfo from '@/components/molecules/WeatherInfo.vue';
import Icon from '@/components/atoms/Icon.vue';

const weatherStore = useWeatherStore();
const weatherDetail = computed(() => weatherStore.weatherDetail);
const router = useRouter();

const deleteCity = (id: string) => {
  weatherStore.deleteCity(id);
  router.push('/');
};
</script>