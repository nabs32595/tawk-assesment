<template>
  <button
      :type="type"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
});
defineEmits(['click']);
</script>
