<template>
    <section class="flex flex-col space-y-5">
      <div class="flex flex-col w-full max-md:max-w-full space-y-5">
        <!-- Render Extra Items -->
        <div
          v-for="(extra, index) in extraItems"
          :key="extra.id"
          class="relative flex flex-col w-full rounded-3xl border-2 border-solid min-h-[106px] max-md:max-w-full transition-all duration-300"
          :class="selectedExtras.includes(index) ? 'bg-gray-300 text-black border-black' : 'bg-white text-black border-black border-opacity-30'"
        >
          <button
            class="flex flex-wrap gap-2.5 justify-center items-center p-8 py-7 mt-5 w-full max-md:px-5 max-md:max-w-full"
            @click="selectExtra(index)"
          >
            <img
              :src="extra.image"
              :alt="extra.name"
              class="w-20 h-20 rounded-lg object-cover"
            />
            <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <h2 class="text-base font-bold">{{ extra.name }}</h2>
              <p class="mt-2.5 text-sm leading-none text-slate-800 max-md:max-w-full">
                <span class="text-neutral-500">{{ extra.category }}</span>
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
  import { extraItems } from '~/data/extras'; // Vérifie le chemin selon ton projet
  
  const emit = defineEmits(['extrasSelectionChanged']);
  
  const selectedExtras = ref<number[]>([]);
  
  function selectExtra(index: number) {
    if (selectedExtras.value.includes(index)) {
      selectedExtras.value = selectedExtras.value.filter(i => i !== index);
    } else {
      selectedExtras.value.push(index);
    }
  
    emit('extrasSelectionChanged', selectedExtras.value);
  }
  </script>
  