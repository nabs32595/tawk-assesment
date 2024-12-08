<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <MobileFixedSizeTemplate>
        <component :is="Component"/>
      </MobileFixedSizeTemplate>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import MobileFixedSizeTemplate from "@/templates/MobileFixedSizeTemplate.vue";
</script>
