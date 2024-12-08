<template>
  <div class="relative">
    <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="alt || 'Profile Picture'"
        class="rounded-full object-cover"
    />
    <button
        v-if="isEdit"
        @click="triggerFileUpload"
        class="absolute bottom-1 right-1 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
    >
      <Icon name="PencilIcon" size="w-5 h-5" />
    </button>

    <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const imageUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Cache Image Functionality
const cacheImage = async (url: string): Promise<string> => {
  const cacheName = 'profile-pictures';
  const cache = await caches.open(cacheName);

  const cachedResponse = await cache.match(url);
  if (cachedResponse) {
    return url;
  }

  const response = await fetch(url);
  if (response.ok) {
    await cache.put(url, response);
    return url;
  }

  throw new Error(`Failed to fetch and cache image from ${url}`);
};

watch(
    () => props.src,
    async (newSrc) => {
      if (newSrc) {
        try {
          imageUrl.value = await cacheImage(newSrc);
        } catch (error) {
          console.error('Error caching image:', error);
          imageUrl.value = null;
        }
      } else {
        imageUrl.value = null;
      }
    },
    { immediate: true }
);

const triggerFileUpload = () => {
  fileInput.value?.click();
};

// Resize Image Functionality
const resizeImage = async (file: File, maxSize: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        } else {
          reject('Failed to get canvas context');
        }
      };
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject('Failed to read file');
    reader.readAsDataURL(file);
  });
};

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    try {
      imageUrl.value = await resizeImage(file, 100);
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
