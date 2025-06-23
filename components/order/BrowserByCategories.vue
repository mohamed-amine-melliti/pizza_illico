<script setup lang="ts">
import { ref, computed } from "vue";
import Card from '~/components/Ui/Card/Card.vue';
import CardContent from '~/components/Ui/Card/Content.vue';
import CardTitle from '~/components/Ui/Card/Title.vue';
import { categories as rawCategories } from '~/composables/CategoriesFood';
import { MenuCategory } from '@/entities/MenuCategory';
import Sidebar from "./Sidebar.vue";

const isSidebarOpen = ref(false);
const selectedCategory = ref<MenuCategory | null>(null);

const categories = computed<MenuCategory[]>(() =>
  rawCategories.map((category, index) => ({
    id: index + 1,
    name: category.title,
    description: category.description,
    image: category.image
  }))
);

const openSidebar = (category: MenuCategory) => {
  selectedCategory.value = { ...category };
  isSidebarOpen.value = true;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#fffdf8] px-4 py-8">
    <div class="text-2xl font-bold text-center text-gray-800 mb-8">
      Commander Maintenant
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="category in categories" :key="category.id"
        class="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border-none bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50 shadow rounded-lg cursor-pointer active:scale-95"
        @click="openSidebar(category)">
        <img :src="category.image" :alt="category.name" class="w-full h-28 object-contain p-3" />

        <CardContent class="text-center px-3 pb-4">
          <CardTitle class="text-base font-semibold text-gray-800 mb-2">
            {{ category.name }}
          </CardTitle>
          <p class="text-xs text-gray-600 line-clamp-2">
            {{ category.description }}
          </p>
          <div class="mt-3 text-xs font-medium text-red-800 opacity-75">
            Cliquez pour commander
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Sidebar Component -->
    <Sidebar :isOpen="isSidebarOpen" :category="selectedCategory" @close="closeSidebar" />
  </div>
</template>

<style scoped>
@media (max-width: 500px) {
  .w-24 {
    width: 4.5rem !important;
    height: 4.5rem !important;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>