<template>
  <section class="flex flex-col space-y-5">
    <div class="flex flex-col w-full max-md:max-w-full space-y-5">
      <!-- Dynamically render buttons for dessert combos -->
      <div
        v-for="(dessert, index) in dessertCombos"
        :key="dessert.id"
        class="relative flex flex-col w-full rounded-3xl border-2 border-solid min-h-[106px] max-md:max-w-full transition-all duration-300"
        :class="selectedMenuItems.includes(index) ? 'bg-gray-300 text-black border-black' : 'bg-white text-black border-black border-opacity-30'"
      >
        <button
          class="flex flex-wrap gap-2.5 justify-center items-center p-8 py-7 mt-5 w-full max-md:px-5 max-md:max-w-full"
          @click="selectMenuItem(index)"
        >
          <!-- Menu Image -->
          <img
            :src="dessert.image"
            :alt="dessert.name"
            class="w-20 h-20 rounded-lg object-cover"
          />

          <!-- Menu Details -->
          <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
            <h2 class="text-base font-bold">{{ dessert.name }}</h2>
            <p class="mt-2.5 text-sm leading-none text-slate-800 max-md:max-w-full">
              <span class="text-neutral-500">{{ dessert.category }}</span>
            </p>
          </div>
        </button>
      </div>

      <!-- Help Link -->
      <a href="#help" class="mt-5 text-xs tracking-wide underline text-slate-800">
        Get Help?
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { dessertCombos } from '~/data/combos'; // <-- assure-toi que le chemin est bon

const emit = defineEmits(['menuSelectionSelected']);

const selectedMenuItems = ref<number[]>([]);

function selectMenuItem(index: number) {
  if (selectedMenuItems.value.includes(index)) {
    selectedMenuItems.value = selectedMenuItems.value.filter(i => i !== index);
  } else {
    selectedMenuItems.value.push(index);
  }

  emit('menuSelectionSelected', selectedMenuItems.value);
}
</script>
