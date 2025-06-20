<template>
  <section class="max-w-7xl mx-auto px-4 py-10">
    <!-- Title -->
    <h2 class="text-4xl font-semibold text-center text-orange-600 mb-8 font-serif">My Restaurant Menu</h2>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mb-10">
      <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
        'px-4 py-2 rounded-full border border-orange-500 text-sm font-medium transition',
        selectedCategory === category
          ? 'bg-orange-500 text-white'
          : 'text-orange-600 hover:bg-orange-100'
      ]">
        {{ category }}
      </button>
    </div>

    <!-- Menu Items -->
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="item in filteredMenu" :key="item.name"
        class="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition">
        <div class="w-full h-36 overflow-hidden flex justify-center items-center bg-gray-100">
          <img :src="item.image" :alt="item.name" class="h-full object-contain" />
        </div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex justify-between items-center border-b pb-2">
            <h4 class="text-lg font-semibold text-gray-800">{{ item.name }}</h4>
            <span v-if="item.price !== undefined" class="text-orange-600 font-bold text-sm">
              {{ item.price.toFixed(2) }} €
            </span>
            <span v-else class="text-gray-400 text-sm italic">Prix non disponible</span>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>




<script setup lang="ts">
import { ref, computed } from 'vue'

// Imported data
import { TexMex } from '~/data/texmex'
import { tortillasMenu } from '~/data/tortillas'
import { PaninisSelection } from '~/data/paninis'
import { pizzas } from '~/data/pizzas'

// Categories for the filter buttons
const categories = [ 'Pizza', 'Tex Mex', 'Paninis', 'Combos', 'Desserts']
const selectedCategory = ref('All')

// Combine the imported menu data into a single `menu` array
const menu = ref([
  ...pizzas.map(item => ({ ...item, category: 'Pizza' })),  // Pizza items
  ...TexMex.map(item => ({ ...item, category: 'Tex Mex' })),  // Tex Mex items
  ...PaninisSelection.map(item => ({ ...item, category: 'Paninis' })),  // Paninis items
  ...tortillasMenu.map(item => ({ ...item, category: 'Tortillas' })),  // Tortillas items
])

// Filter the menu based on the selected category
const filteredMenu = computed(() =>
  selectedCategory.value === 'All'
    ? menu.value
    : menu.value.filter(item => item.category === selectedCategory.value)
)
</script>



<style scoped>
.container {
  padding: 2rem;
  font-family: 'Zilla Slab', serif;
}

.title h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.btn-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.btn-item {
  border: 1px solid #333;
  padding: 0.5rem 1rem;
  background: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-item:hover,
.btn-item.active {
  background: #333;
  color: white;
}

.menu-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.menu-item {
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.photo {
  width: 100%;
  object-fit: cover;
  height: 200px;
}

.menu-info {
  padding: 1rem;
}

.menu-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.price {
  color: #555;
}

.menu-text {
  color: #666;
  font-size: 0.9rem;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f1f5f8;
  font-family: "Zilla Slab", serif;
}

h2 {
  font-family: "Great Vibes", cursive;
  font-size: 3rem;
  text-align: center;
  color: #ff6a23;
  padding-top: 50px;
}

footer>h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2rem;
  text-align: center;
  color: #964b29;

}

.menu {
  margin-top: 20px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
}

.btn-item {
  margin-left: 15px;
}

.photo {
  width: 30%;
  height: 175px;
  object-fit: cover;
  border: 0.25rem solid black;
  border-radius: 10px;
  box-shadow: -10px 10px 10px 0px rgba(0, 0, 0, 0.75);
}

.menu-items {
  display: flex;
  margin: 20px 0;
  padding-right: 50px;
}

.menu-info {
  margin-left: 20px;
  width: 100%;
}

.menu-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}

h4 {
  color: #e00a00;
}

.menu-text {
  padding-top: 20px;
}

footer {
  margin-top: 50px;
  position: relative;
  bottom: 30px;
  width: 100%;
}
</style>