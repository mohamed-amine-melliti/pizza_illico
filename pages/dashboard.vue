<script setup lang="ts">
import Button from '~/components/Ui/Button.vue'
import AlertDialog from "~/components/Ui/AlertDialog/AlertDialog.vue"
import AlertDialogContent from "~/components/Ui/AlertDialog/Content.vue"
import AlertDialogTrigger from "~/components/Ui/AlertDialog/Trigger.vue"
import Form from "~/components/order/Form.vue"
import HeaderOfOrderPage from '~/components/order/HeaderOfOrderPage.vue'
import BrowserByCategories from '~/components/order/BrowserByCategories.vue'
import { Separator } from '@/lib/registry/default/ui/separator'
import BrowseCategoriesAndMakeOrders from '~/components/special-order/BrowseCategoriesAndMakeOrders.vue'
import MenuActionsButtonsDialog from '~/components/menu/actionsButtonDialog.vue'
import CategoryDetail from '~/components/menu/CategoryDetail.vue'
import { ref } from 'vue'
const isDialogOpen = ref(false)
</script>

<template>
  <HeaderOfOrderPage />

  <div class="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[70vh] bg-[#fffdf8]">
    <!-- Background Image -->
    <img
      src="https://res.cloudinary.com/justsalad/image/upload/g_auto/f_auto/q_auto/g_auto/v1734616146/seasonalmenus/APP_Winter_Sweet-Chicken_h5nugw?_a=BAVAZGDW0"
      alt="Delicious Dish"
      class="absolute inset-0 w-full h-full object-cover object-center rounded-none"
    />

    <!-- Overlay Content -->
    <div
      class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        class="bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md sm:max-w-lg w-full text-center p-6 sm:p-8 space-y-4 mx-4 sm:mx-auto"
      >
        <h1
          class="text-xl sm:text-3xl font-bold text-gray-900 font-patrick leading-tight"
        >
          Le goût vite fait !
        </h1>

        <button
          @click="isDialogOpen = true"
          class="bg-gradient-to-br from-yellow-200 via-red-100 to-orange-200 text-red-900 font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border border-red-300 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
        >
          🍕 Voir Le Menu
        </button>

        <Separator />

        <p class="text-xs sm:text-sm text-gray-600 font-medium px-2 sm:px-0">
          Connectez-vous pour une expérience fluide de commande et de paiement.
        </p>

        <MenuActionsButtonsDialog />
      </div>
    </div>

    <!-- Dialog -->
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4 sm:p-8"
      @click.self="isDialogOpen = false"
    >
      <div
        class="relative bg-white w-full max-w-screen-sm sm:max-w-screen-md max-h-[80vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg"
      >
        <button
          @click="isDialogOpen = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl sm:text-3xl"
          aria-label="Close"
        >
          ✖
        </button>

        <CategoryDetail />
      </div>
    </div>
  </div>

  <BrowserByCategories />
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

.font-patrick {
  font-family: 'Patrick Hand', cursive;
}
</style>
