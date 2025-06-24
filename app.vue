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

<script setup lang="ts">

import { provideToast } from './composables/useCustomToast'

provideToast()
</script>
