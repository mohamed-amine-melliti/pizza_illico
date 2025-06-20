<template>
  <div class="px-4 py-8 bg-[#fffdf8]">
    <div v-if="!selectedCategory" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="item in menu"
        :key="item.id"
        class="menu-card text-center cursor-pointer"
        @click="selectCategory(item)"
      >
        <img :src="item.image" :alt="item.name" class="w-full h-40 sm:h-44 object-cover rounded-lg mb-3" />
        <div class="menu-name font-hand uppercase">{{ item.name }}</div>
        <div class="menu-description">{{ item.description }}</div>
        <div class="menu-price">{{ item.price }}</div>
      </div>
    </div>

    <CategoryDetail
      v-else
      :category="selectedCategory"
      @go-back="selectedCategory = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CategoryDetail from './CategoryDetail.vue'; // Make sure to create this component

const selectedCategory = ref(null);

function selectCategory(item) {
  selectedCategory.value = item;
}

const menu = [
  {
    id: 1,
    name: 'Pizza',
    description: 'Classic Italian-style with rich tomato sauce and mozzarella.',
    price: 'Rs. 360/540 M/L',
    image: '/images/pizza.png'
  },
  {
    id: 2,
    name: 'Tex-Mex',
    description: 'Spicy fusion with beans, cheese, jalapeños, and salsa.',
    price: 'Rs. 400',
    image: '/images/texmex.png'
  },
  {
    id: 3,
    name: 'Paninis',
    description: 'Grilled sandwiches with melted cheese and assorted fillings.',
    price: 'Rs. 350',
    image: '/images/panini.png'
  },
  {
    id: 4,
    name: 'Tortillas',
    description: 'Soft flour tortillas filled with fresh veggies and sauces.',
    price: 'Rs. 300',
    image: '/images/tortilla.png'
  }
];
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

.font-hand {
  font-family: 'Patrick Hand', cursive;
}

.menu-card {
  background-color: #fffaf2;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0e0cc;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
}

.menu-name {
  color: #3c2f2f;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.menu-description {
  color: #6b4f4f;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.menu-price {
  color: #b33c00;
  font-weight: bold;
  font-size: 0.95rem;
}
</style>
