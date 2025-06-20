<script setup lang="ts">
import { ref, watch } from 'vue'
import { CheckCircle, CookingPot, Truck, Home } from 'lucide-vue-next'

import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator
} from '@/components/ui/Stepper/index'

// Reactive state for command ID input
const commandIdInput = ref('')

// Simulate current step based on entered command ID (example)
const currentStep = ref(1)

// Sample steps
const steps = [
  { step: 1, title: 'Commande reçue', description: 'Votre commande a été enregistrée.', icon: CheckCircle },
  { step: 2, title: 'En préparation', description: 'Notre équipe prépare votre commande.', icon: CookingPot },
  { step: 3, title: 'En livraison', description: 'Le livreur est en route.', icon: Truck },
  { step: 4, title: 'Livrée', description: 'La commande a été livrée.', icon: Home }
]

// Fake logic to update currentStep when commandIdInput changes (replace with your API logic)
watch(commandIdInput, (val) => {
  if (!val) {
    currentStep.value = 1
  } else if (val.endsWith('1')) {
    currentStep.value = 1
  } else if (val.endsWith('2')) {
    currentStep.value = 2
  } else if (val.endsWith('3')) {
    currentStep.value = 3
  } else {
    currentStep.value = 4
  }
})
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4 mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center">Suivi de commande</h2>

    <!-- Command ID Input -->
    <div class="mb-8 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 max-w-md mx-auto">
      <label for="commandId" class="sr-only">Numéro de commande</label>
      <input
        id="commandId"
        v-model="commandIdInput"
        type="text"
        placeholder="Entrez  numéro de commande"
        class="flex-grow border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="button"
        class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
        @click="$refs.commandIdInput && $refs.commandIdInput.focus()"
      >
        Suivre
      </button>
    </div>

    <!-- Show Command ID or placeholder -->
    <div v-if="commandIdInput" class="text-center text-sm text-gray-600 mb-6">
      Numéro de commande : <span class="font-mono font-medium text-gray-800">{{ commandIdInput }}</span>
    </div>

    <!-- Stepper -->
    <Stepper class="flex flex-col sm:flex-row w-full gap-6">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        :step="item.step"
        class="flex flex-col sm:flex-1"
      >
        <div class="flex items-start sm:items-center gap-3 sm:flex-col sm:items-center sm:text-center">
          <StepperIndicator
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full border-2',
              item.step < currentStep ? 'bg-green-500 text-white border-green-500' :
              item.step === currentStep ? 'bg-yellow-400 text-white border-yellow-400' :
              'bg-gray-200 text-gray-500 border-gray-300'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
          </StepperIndicator>

          <div class="sm:mt-2">
            <StepperTitle :class="item.step === currentStep ? 'font-semibold text-yellow-600' : item.step < currentStep ? 'text-green-600' : 'text-gray-600'">
              {{ item.title }}
            </StepperTitle>
            <StepperDescription class="text-sm text-gray-500">
              {{ item.description }}
            </StepperDescription>
          </div>
        </div>

        <StepperSeparator
          v-if="item.step !== steps.length"
          class="hidden sm:block h-0.5 w-full bg-gray-300 my-4"
        />
      </StepperItem>
    </Stepper>

    <!-- Current step display -->
    <div class="mt-8 text-center text-lg font-medium text-gray-700">
      Étape actuelle :
      <span class="text-yellow-600">{{ steps[currentStep - 1].title }}</span>
    </div>
  </div>
</template>
