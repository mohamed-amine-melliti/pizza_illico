<!-- components/BaseToast.vue -->
<template>
    <transition name="slide-up">
      <div
        v-if="visible"
        class="fixed bottom-6 right-6 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50"
      >
        <span class="text-xl">✅</span>
        <div class="flex flex-col">
          <strong class="text-white text-base">{{ title }}</strong>
          <span class="text-white text-sm">{{ description }}</span>
        </div>
        <button @click="close" class="ml-4 text-white font-bold text-lg">×</button>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  defineProps<{
    title: string
    description: string
    duration?: number
  }>()
  
  const visible = ref(true)
  
  const close = () => {
    visible.value = false
  }
  
  onMounted(() => {
    setTimeout(() => {
      close()
    }, (defineProps().duration ?? 3000))
  })
  </script>
  
  <style scoped>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>
  