<template>
  <section class="flex flex-col space-y-5">
    <div class="flex flex-col w-full max-md:max-w-full space-y-5">
      <!-- Dynamically render buttons for panini items -->
      <div
        v-for="(panini, index) in PaninisSelection"
        :key="index"
        class="relative flex flex-col w-full rounded-3xl border-2 border-solid min-h-[106px] max-md:max-w-full transition-all duration-300"
        :class="selectedMenuItems.includes(index) ? 'bg-gray-300 text-black border-black' : 'bg-white text-black border-black border-opacity-30'"
      >
        <button
          class="flex flex-wrap gap-2.5 justify-center items-center p-8 py-7 mt-5 w-full max-md:px-5 max-md:max-w-full"
          @click="selectMenuItem(index)"
        >
          <!-- Image -->
          <img :src="panini.image" :alt="panini.name" class="w-20 h-20 rounded-lg object-cover" />

          <!-- Details -->
          <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
            <h2 class="text-base font-bold">{{ panini.name }}</h2>
            <p class="mt-2.5 text-sm leading-none text-slate-800 max-md:max-w-full">
              <span class="text-neutral-500">{{ panini.description }}</span>
            </p>
            <p v-if="panini.price" class="mt-2.5 text-sm font-bold text-red-600">
              {{ panini.price }}€
            </p>
          </div>
        </button>
      </div>

      <!-- Help -->
      <a href="#help" class="mt-5 text-xs tracking-wide underline text-slate-800">
        Get Help?
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { PaninisSelection } from '~/data/paninis';

// Define the emit event
const emit = defineEmits<{
  (event: 'menuSelectionSelected', payload: {
    selected: { index: number; name: string; price: number }[];
    totalPrice: number;
  }): void;
}>();

// Selected paninis index list
const selectedMenuItems = ref<number[]>([]);

// Emit selected paninis and total price to parent
function emitSelection() {
  const selected = selectedMenuItems.value.map(index => {
    const item = PaninisSelection[index];
    return {
      index,
      name: item.name,
      price: item.price || 0
    };
  });

  const totalPrice = selected.reduce((sum, item) => sum + item.price, 0);

  emit('menuSelectionSelected', {
    selected,
    totalPrice
  });
}

// Handle selection toggle
function selectMenuItem(index: number) {
  if (selectedMenuItems.value.includes(index)) {
    selectedMenuItems.value = selectedMenuItems.value.filter(i => i !== index);
  } else {
    selectedMenuItems.value.push(index);
  }

  emitSelection(); // Emit updated selection on change
}

</script>
