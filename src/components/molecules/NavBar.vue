<template>
  <nav class="p-4 flex items-center justify-between">
    <Icon name="ChevronLeftIcon" size="w-5 h-5" class="cursor-pointer" @click="navigateBack"/>
    <span class="text-xl flex-1 text-center"><slot name="title"></slot></span>
    <div class="w-5 h-5">
      <slot name="right-icon"></slot>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Icon from '@/components/atoms/Icon.vue';

const router = useRouter();

const navigateBack = () => {
  router.back();
};
</script>