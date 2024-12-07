<template>
  <ul v-if="items.length" class="mt-2">
    <li
        v-for="item in items"
        :key="item.id"
        class="p-2 hover:bg-gray-200 cursor-pointer"
        @click="$emit('select', item)"
    >
      {{ item.name }}, {{ item.country }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
defineEmits(['select']);
</script>
