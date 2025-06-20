<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { MenuCategory } from '@/entities/MenuCategory';

const props = defineProps<{
  isOpen: boolean;
  category: MenuCategory | null;
}>();

const emit = defineEmits(["close"]);
</script>

<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 h-full bg-white shadow-lg z-50 p-6 sm:p-8 overflow-y-auto transform transition-all duration-300 w-full sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-700 text-2xl"
        @click="emit('close')"
        aria-label="Close"
      >
        ✖
      </button>

      <!-- Optional Category Details -->
      <!--
      <div v-if="category">
        <h2 class="text-2xl font-bold mb-4">{{ category.name }}</h2>
        <img :src="category.image" :alt="category.name" class="w-full h-60 object-cover rounded-md mb-4" />
        <p class="text-gray-700 text-lg">{{ category.description }}</p>
      </div>
      -->

      <!-- Order Component -->
      <OrderCreateOrder />
    </div>
  </transition>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
