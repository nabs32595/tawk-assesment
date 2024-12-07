<template>
  <div id="app">
    <MobileFixedSizeTemplate>
<!--      <nav-bar />-->
      <router-view />
    </MobileFixedSizeTemplate>
  </div>
</template>

<script setup lang="ts">
import MobileFixedSizeTemplate from "@/templates/MobileFixedSizeTemplate.vue";
import NavBar from "@/components/molecules/NavBar.vue";
</script>

<style scoped>
</style>
