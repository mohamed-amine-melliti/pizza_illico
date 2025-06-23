<template>
  <div class="flex flex-col gap-3 w-full max-w-md mx-auto p-4">

    <!-- Suivre Commande -->
    <Button @click="openFollowDialog = true"
      class="bg-gray-900 text-white font-semibold hover:bg-gray-800 transition py-2 rounded-md text-lg">
      Suivre Commande
    </Button>

    <!-- Faire Commande -->
    <Button @click="isSidebarOpen = true"
      class="bg-gray-900 text-white font-semibold hover:bg-gray-800 transition py-2 rounded-md text-lg">
      Faire Commande
    </Button>

    <!-- Commander Dialog -->
    <div v-if="openConnectDialog"
      class="fixed inset-0 z-[999] bg-gray-600 bg-opacity-50 flex justify-center items-center px-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-y-auto max-h-screen relative">
        <button @click="openConnectDialog = false"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">&times;</button>

        <h3 class="text-3xl font-bold mb-6 text-gray-800">Commander Dialog</h3>
        <CreateOrdersDialog />

        <div class="mt-6 text-right">
          <button @click="openConnectDialog = false"
            class="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Suivre Commande Dialog -->
    <div v-if="openFollowDialog"
      class="fixed inset-0 z-[999] bg-gray-600 bg-opacity-50 flex justify-center items-center px-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-y-auto max-h-screen relative">
        <button @click="openFollowDialog = false"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">&times;</button>

        <SuivreCommande />

        <div class="mt-6 text-right">
          <button @click="openFollowDialog = false"
            class="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar Component -->
    <Sidebar :isOpen="isSidebarOpen" :category="selectedCategory" @close="closeSidebar" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateOrdersDialog from '../order/CreateOrder.vue';
import SuivreCommande from '../dialog/SuivreCommande.vue';
import Sidebar from "../order/Sidebar.vue";

// Dialog states
const openConnectDialog = ref(false);
const openFollowDialog = ref(false);

// Sidebar states
const isSidebarOpen = ref(false);
const selectedCategory = ref(null);

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>


<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

button {
  padding: 10px;
  margin-top: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

button:hover {
  background-color: #444;
}
</style>
