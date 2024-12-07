<template>
  <div class="flex gap-2">
    <InputField
        v-model="query"
        placeholder="Search for a city"
        @keyup.enter="onSearch"
    />
    <Button @click="onSearch">Search</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputField from '../atoms/InputField.vue';
import Button from '../atoms/Button.vue';

const emit = defineEmits(['search']);

const query = ref('');

const onSearch = () => {
  emit('search', query.value);
};
</script>
