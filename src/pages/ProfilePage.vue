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
            :isEdit="!isReadonly"
        />
      </div>
      <h2 class="text-lg font-bold text-gray-700">{{ user.fullName }}</h2>
      <p class="text-md text-gray-600">
        {{ user.email }} | {{ user.phone }}
      </p>
    </div>

    <form @submit.prevent="handleEditToggle" class="flex flex-col flex-grow gap-4 mt-6">
      <InputField
          v-model="editedUser.fullName"
          placeholder="Jane Doe"
          :readonly="isReadonly"
      >
        <template #label>Full name</template>
        <template #error>
          <div class="text-red-500 text-xs">
            <div v-for="(error, index) in v$.editedUser.fullName.$errors" :key="index">{{ error.$message }}</div>
          </div>
        </template>
      </InputField>
      <InputField
          v-model="editedUser.email"
          placeholder="jane@gmail.com"
          type="email"
          :readonly="isReadonly"
      >
        <template #label>Email</template>
        <template #error>
          <div class="text-red-500 text-xs">
            <div v-for="(error, index) in v$.editedUser.email.$errors" :key="index">{{ error.$message }}</div>
          </div>
        </template>
      </InputField>
      <InputField
          v-model="editedUser.phone"
          placeholder="+0123456789"
          type="tel"
          :readonly="isReadonly"
      >
        <template #label>Phone</template>
        <template #error>
          <div class="text-red-500 text-xs">
            <div v-for="(error, index) in v$.editedUser.phone.$errors" :key="index">{{ error.$message }}</div>
          </div>
        </template>
      </InputField>

      <div class="mt-4">
        <Button @click="handleEditToggle">
          {{ isReadonly ? 'EDIT' : 'SAVE' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required, email, minLength} from "@vuelidate/validators";
import NavBar from "@/components/molecules/NavBar.vue";
import InputField from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Image from "@/components/atoms/Image.vue";
import avatarUrl from '@/assets/avatar.svg';

interface User {
  fullName: string;
  email: string;
  phone: string;
}

const user: User = reactive({
  fullName: "Jane Doe",
  email: "jane@gmail.com",
  phone: "+0123456789"
});

const editedUser: User = reactive({
  ...user
});

const isReadonly = ref(true);

const rules = {
  editedUser: {
    fullName: {required, minLength: minLength(3)},
    email: {required, email},
    phone: {required, minLength: minLength(10)}
  }
};

const v$ = useVuelidate(rules, {editedUser});

const handleEditToggle = () => {
  if (isReadonly.value) {
    isReadonly.value = false;
    Object.assign(editedUser, user);
  } else {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      Object.assign(user, editedUser);
      isReadonly.value = true;
    } else {
      alert("Please correct the errors in the form.");
    }
  }
};
</script>
