<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  icon: string;
  defaultSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "categorySelect", category: string): void;
}>();

const selected = ref(props.defaultSelected ?? false);

function toggleCategory() {
  selected.value = !selected.value;
  emit("categorySelect", props.label);
}
</script>

<template>
  <div
    @click="toggleCategory"
    class="relative rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ease-in-out cursor-pointer"
    :class="[
      selected ? 'border-2 border-green-500 bg-green-50' : 'border-2 border-neutral-200',
      'hover:border-black'
    ]"
  >
    <!-- Green checkmark in bottom-right when selected -->
    <transition name="checkmark">
      <div
        v-if="selected"
        class="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg z-10 animate-checkmark"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </transition>

    <img :src="icon" alt="category icon" class="w-16 h-16 object-contain" />
    <div class="text-sm font-medium text-center">{{ label }}</div>
  </div>
</template>

<style scoped>
@keyframes checkmark-bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.animate-checkmark {
  animation: checkmark-bounce 0.3s ease-out;
}
</style>
