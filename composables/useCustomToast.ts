// composables/useCustomToast.ts
import { ref, provide } from 'vue'

const toasts = ref<{ title: string; description: string; duration?: number }[]>([])

export function provideToast() {
  provide('toasts', toasts)
}

export function useCustomToast() {
  const toast = (t: { title: string; description: string; duration?: number }) => {
    toasts.value.push(t)
  }
  return { toast }
}
