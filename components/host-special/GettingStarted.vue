<template>
  <div class="w-full max-w-2xl mx-auto p-6 space-y-8">
    <!-- Title Section -->
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
        Commencez votre commande dès maintenant !
      </h1>
      <p class="text-base md:text-lg text-gray-600">
        Suivez ces étapes simples pour passer votre commande en un rien de temps.
      </p>
    </div>

    <!-- Steps List -->
    <div class="space-y-10">
      <div v-for="(step, index) in steps" :key="index"
        class="flex flex-col md:flex-row items-start gap-4 border-b border-gray-200 pb-6">
        <!-- Step Icon -->
        <div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
          <img :src="step.icon" :alt="step.title" class="w-full h-full object-contain" />
        </div>

        <!-- Step Content -->
        <div class="flex flex-1 flex-col md:flex-row gap-4 md:gap-6">
          <!-- Step Number -->
          <div class="text-2xl md:text-3xl font-bold text-gray-700">
            {{ index + 1 }}
          </div>
          <div>
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {{ step.title }}
            </h2>
            <p class="text-sm md:text-base text-gray-700">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GettingStarted',
  setup() {
    const steps = [
      {
        title: "Choisissez vos plats",
        description:
          "Parcourez notre menu et sélectionnez les plats qui vous font envie.",
        icon: "https://glovo.dhmedia.io/image/customer-assets-glovo/category_group_icons/a79ace566074e380f98056265cac2c0ae312dbfecb165dea7d7247d406f6305d?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
      },
      {
        title: "Personnalisez votre commande",
        description:
          "Ajoutez des options, des suppléments ou laissez une note spéciale au restaurant.",
        icon: "https://glovo.dhmedia.io/image/customer-assets-glovo/category_group_icons/c0fd33b415a34052003807189c2a8e5c513b1fcef4be33a79052344abecfcc02?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
      },
      {
        title: "Confirmez et dégustez",
        description:
          "Vérifiez votre commande, passez au paiement et attendez la livraison de votre délicieux repas !",
        icon: "https://glovo.dhmedia.io/image/customer-assets-glovo/category_group_icons/3ec9bff5a4a85485922e6c6f74de529bc7981ac30e5766e8a8648c7d3f28dae2?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
      },
    ];


    return {
      steps,
    };
  },
});
</script>
