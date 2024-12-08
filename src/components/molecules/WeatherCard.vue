<template>
  <div class="bg-gray-400 text-white rounded-3xl p-4 flex flex-col relative">
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="text-xl font-bold">{{ title }}</div>
        <div class="text-lg font-semibold">{{ location }}</div>
        <div class="text-sm">{{ subtitle }}</div>
        <div class="mt-4 text-sm">{{ description }}</div>
      </div>
      <div class="flex flex-col items-end">
        <div class="text-4xl font-bold">{{ temperature }}°</div>
        <div class="mt-4 text-sm">
          <span class="mr-2">H: {{ highTemp }}°</span>
          <span>L: {{ lowTemp }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

defineProps<{
  title: string;
  location: string;
  subtitle: string;
  temperature: number;
  description: string;
  highTemp: number;
  lowTemp: number;
}>();
</script>