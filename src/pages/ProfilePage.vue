<template>
  <div class="flex flex-col min-h-screen my-4 mx-4">
    <NavBar>
      <template #title>
        Edit Profile
      </template>
    </NavBar>

    <div class="flex flex-col items-center gap-2 mt-6">
      <div class="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center">
        <Image
            :src="avatarUrl"
            alt="Profile"
            class="w-full h-full rounded-full"
            :isEdit="true"
        />
      </div>
      <h2 class="text-lg font-bold text-gray-700">{{ user.fullName }}</h2>
      <p class="text-md text-gray-600">
        {{ user.email }} | {{ user.phone }}
      </p>
    </div>

    <form @submit.prevent="handleEdit" class="flex flex-col flex-grow gap-4 mt-6">
      <InputField
          v-model="user.fullName"
          placeholder="Jane Doe"
          :readonly="isReadonly"
      >
        <template #label>Full name</template>
      </InputField>
      <InputField
          v-model="user.email"
          placeholder="jane@gmail.com"
          type="email"
          :readonly="isReadonly"
      >
        <template #label>Email</template>
      </InputField>
      <InputField
          v-model="user.phone"
          placeholder="+0123456789"
          type="tel"
          :readonly="isReadonly"
      >
        <template #label>Phone</template>
      </InputField>

      <div class="mt-4">
        <Button @click="toggleEdit">
          {{ isReadonly ? 'EDIT' : 'SAVE' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import NavBar from "@/components/molecules/NavBar.vue";
import InputField from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Image from "@/components/atoms/Image.vue";
import avatarUrl from '@/assets/avatar.svg';


interface User {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

const user: User = reactive({
  fullName: "Jane Doe",
  email: "jane@gmail.com",
  phone: "+0123456789"
});

const isReadonly = ref(true);

const toggleEdit = () => {
  if (isReadonly.value) {
    isReadonly.value = false;
  } else {
    alert("Profile updated successfully!");
    isReadonly.value = true;
  }
};

const handleEdit = () => {
  alert("Form submitted!");
};
</script>
