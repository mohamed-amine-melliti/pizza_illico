<template>
  <section class="flex flex-col space-y-5">
    <div class="flex flex-col w-full max-md:max-w-full space-y-5">
      <!-- Pizza Cards -->
      <div
        v-for="pizza in pizzas"
        :key="pizza.name"
        class="relative flex flex-col w-full rounded-3xl border-2 border-solid min-h-[106px] max-md:max-w-full transition-all"
        :class="selectedPizzas.includes(pizza.name) ? 'bg-neutral-300 text-black border-black shadow-lg' : 'bg-white text-black border-black border-opacity-30'"
      >
        <button
          class="flex flex-wrap gap-2.5 justify-center items-center p-8 py-7 w-full max-md:px-5"
          @click="selectPizza(pizza.name)"
        >
          <img :src="pizza.image" :alt="pizza.name" class="w-20 h-20 rounded-lg object-cover" />
          <div class="flex flex-col flex-1 shrink justify-center my-auto basis-0 min-w-[240px]">
            <h2 class="text-base font-bold">{{ pizza.name }}</h2>
            <p class="mt-2.5 text-sm text-neutral-500">{{ pizza.ingredients }}</p>
            <p class="mt-2.5 text-sm font-bold text-red-600">
              Junior - {{ pizza.junior }} | Super - {{ pizza.super }} | Mega - {{ pizza.mega }}
            </p>
          </div>
        </button>

        <!-- Size/Quantity Controls -->
        <div
          v-if="selectedPizzas.includes(pizza.name)"
          class="flex flex-col items-center justify-center bg-white p-3 rounded-b-3xl shadow-inner space-y-4"
        >
          <div
            v-for="size in ['Junior', 'Super', 'Mega']"
            :key="size"
            class="flex items-center justify-between w-full max-w-sm border p-3 rounded-lg bg-gray-50"
          >
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                :checked="!!selectedPizzaData[pizza.name]?.[size]"
                @change="toggleSize(pizza.name, size)"
              />
              <span class="text-sm font-semibold">{{ size }}</span>
            </label>

            <div v-if="selectedPizzaData[pizza.name]?.[size]" class="flex items-center space-x-3">
              <button
                class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                @click="decreaseQuantity(pizza.name, size)"
              >-</button>
              <span class="text-lg font-semibold">{{ selectedPizzaData[pizza.name][size] }}</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                @click="increaseQuantity(pizza.name, size)"
              >+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="Object.keys(selectedPizzaData).length" class="mt-8 p-4 bg-gray-100 rounded-xl">
        <h3 class="text-lg font-bold mb-3">Selected Pizzas:</h3>
        <ul class="text-sm text-slate-800 space-y-1">
          <li v-for="(sizes, name) in selectedPizzaData" :key="name">
            <strong>{{ name }}</strong>:
            <span
              v-for="(qty, size) in sizes"
              :key="size"
              class="ml-2"
            >{{ size }} × {{ qty }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { pizzas } from '~/data/pizzas';

const emit = defineEmits(['pizzaSelectionChanged']);

const selectedPizzas = ref<string[]>([]);
const selectedPizzaData = reactive<Record<string, Record<string, number>>>({});

function selectPizza(name: string) {
  if (selectedPizzas.value.includes(name)) {
    selectedPizzas.value = selectedPizzas.value.filter(p => p !== name);
    delete selectedPizzaData[name];
  } else {
    selectedPizzas.value.push(name);
    selectedPizzaData[name] = {};
  }
  emitSelection();
}

function toggleSize(pizzaName: string, size: string) {
  const pizza = selectedPizzaData[pizzaName];
  if (!pizza) return;

  if (pizza[size]) {
    delete pizza[size];
  } else {
    pizza[size] = 1;
  }

  // Clean up empty pizza
  if (Object.keys(pizza).length === 0) {
    delete selectedPizzaData[pizzaName];
    selectedPizzas.value = selectedPizzas.value.filter(p => p !== pizzaName);
  }

  emitSelection();
}

function increaseQuantity(pizzaName: string, size: string) {
  if (selectedPizzaData[pizzaName]?.[size] !== undefined) {
    selectedPizzaData[pizzaName][size]++;
    emitSelection();
  }
}

function decreaseQuantity(pizzaName: string, size: string) {
  if (selectedPizzaData[pizzaName]?.[size] > 1) {
    selectedPizzaData[pizzaName][size]--;
  } else {
    delete selectedPizzaData[pizzaName][size];
  }

  // Remove pizza if no sizes selected
  if (Object.keys(selectedPizzaData[pizzaName]).length === 0) {
    delete selectedPizzaData[pizzaName];
    selectedPizzas.value = selectedPizzas.value.filter(p => p !== pizzaName);
  }

  emitSelection();
}

function emitSelection() {
  // Calculate total price
  let total = 0;

  for (const [pizzaName, sizes] of Object.entries(selectedPizzaData.value)) {
    const pizza = pizzas.find(p => p.name === pizzaName);
    if (!pizza) continue;

    for (const [size, qty] of Object.entries(sizes)) {
      const price = size === 'Junior' ? pizza.junior : size === 'Super' ? pizza.super : pizza.mega;
      total += Number(price) * Number(qty);
    }
  }

  emit('pizzaSelectionChanged', {
    data: selectedPizzaData.value,
    totalPrice: total
  });
}

</script>
