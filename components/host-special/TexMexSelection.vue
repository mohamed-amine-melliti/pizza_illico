<template>
  <section class="flex flex-col space-y-5">
    <div class="flex flex-col w-full max-md:max-w-full space-y-5">
      <div
        v-for="(texmex, index) in TexMex"
        :key="texmex.id"
        class="relative flex flex-col w-full rounded-3xl border-2 border-solid min-h-[106px] max-md:max-w-full transition-all duration-300"
        :class="selectedTexMex.includes(texmex.id) ? 'bg-gray-300 text-black border-black' : 'bg-white text-black border-black border-opacity-30'"
      >
        <button
          class="flex flex-wrap gap-2.5 justify-center items-center p-8 py-7 mt-5 w-full max-md:px-5 max-md:max-w-full"
          @click="selectTexMex(texmex.id)"
        >
          <img :src="texmex.image" :alt="texmex.name" class="w-20 h-20 rounded-lg object-cover" />
          <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
            <h2 class="text-base font-bold">{{ texmex.name }}</h2>
            <p class="mt-2.5 text-sm leading-none text-slate-800 max-md:max-w-full">
              <span class="text-neutral-500">{{ texmex.description }}</span>
            </p>
            <p class="mt-2.5 text-sm font-bold text-red-600 max-md:max-w-full">
              <span v-for="(option, i) in texmex.options" :key="i">
                {{ option.size }} - {{ option.price }}€
                <span v-if="i !== texmex.options.length - 1"> | </span>
              </span>
            </p>
          </div>
        </button>

        <div
          v-if="selectedTexMex.includes(texmex.id)"
          class="flex flex-col items-center justify-center bg-white p-3 rounded-b-3xl shadow-inner transition-all space-y-3"
        >
          <div class="flex space-x-3">
            <button
              v-for="option in texmex.options"
              :key="option.size"
              @click="selectSize(texmex.id, option.size)"
              class="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium transition-all"
              :class="selectedTexMexSizes[texmex.id] === option.size ? 'bg-black text-white' : 'bg-gray-100 text-black'"
            >
              {{ option.size }} pieces
            </button>
          </div>
        </div>
      </div>

      <a href="#help" class="mt-5 text-xs tracking-wide underline text-slate-800">Get Help?</a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TexMex } from '~/data/texmex';

const emit = defineEmits(['texmexSelectionSelected']);

const selectedTexMex = ref<number[]>([]);
const selectedTexMexSizes = ref<{ [key: number]: string }>({});

// Main emit logic
function emitSelection() {
  let total = 0;
  const selections: { id: number; size: string; price: number }[] = [];

  selectedTexMex.value.forEach(id => {
    const item = TexMex.find(t => t.id === id);
    const size = selectedTexMexSizes.value[id];
    if (item && size) {
      const option = item.options.find(o => o.size === size);
      if (option) {
        total += option.price;
        selections.push({ id, size, price: option.price });
      }
    }
  });

  emit('texmexSelectionSelected', {
    selected: selections,
    totalPrice: total
  });
}

function selectTexMex(id: number) {
  if (selectedTexMex.value.includes(id)) {
    selectedTexMex.value = selectedTexMex.value.filter(texmexId => texmexId !== id);
    delete selectedTexMexSizes.value[id];
  } else {
    selectedTexMex.value.push(id);
    selectedTexMexSizes.value[id] = '8'; // Default size
  }
  emitSelection();
}

function selectSize(id: number, size: string) {
  selectedTexMexSizes.value[id] = size;
  emitSelection();
}
</script>
