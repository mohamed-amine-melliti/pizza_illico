<!-- components/ToastManager.vue -->
<template>
    <div>
      <BaseToast
        v-for="(toast, index) in toasts"
        :key="index"
        :title="toast.title"
        :description="toast.description"
        :duration="toast.duration"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue'
  import BaseToast from './BaseToast.vue'
  const toasts = inject('toasts')!
  </script>
  