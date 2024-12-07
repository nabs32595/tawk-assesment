<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeLink = ref('');

const navigateTo = (path: string) => {
  activeLink.value = path;
  router.push(path);
};
</script>

<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex gap-4 list-none">
      <li :class="{ 'font-bold underline': activeLink === '/' }" @click="navigateTo('/')" class="cursor-pointer text-white">Home</li>
      <li :class="{ 'font-bold underline': activeLink === '/detail' }" @click="navigateTo('/detail')" class="cursor-pointer text-white">Weather Detail</li>
    </ul>
  </nav>
</template>

<style scoped>
</style>