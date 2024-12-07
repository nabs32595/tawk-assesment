<template>
  <List :items="cities" @select="onCitySelect" />
</template>

<script lang="ts" setup>
import List from '../atoms/List.vue';

defineProps({
  cities: {
    type: Array,
    required: true,
  },
});
defineEmits(['citySelected']);

const onCitySelect = (city: any) => {
  emit('citySelected', city);
};
</script>
