<template>
  <div>


    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>

  <ToastManager />
</template>

<script lang="ts">
import { provideToast } from './composables/useCustomToast'
import ToastManager from './components/ToastManager.vue'

provideToast()
</script>