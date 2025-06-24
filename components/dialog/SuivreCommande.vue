<script setup lang="ts">
import { ref } from 'vue'
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

// Reactive state for the tracked command ID (only updated on button click)
const trackedCommandId = ref('')

// Current step based on tracked command ID
const currentStep = ref(1)

// Sample steps
const steps = [
  { step: 1, title: 'Commande reçue', description: 'Votre commande a été enregistrée.', icon: CheckCircle },
  { step: 2, title: 'En préparation', description: 'Notre équipe prépare votre commande.', icon: CookingPot },
  { step: 3, title: 'En livraison', description: 'Le livreur est en route.', icon: Truck },
  { step: 4, title: 'Livrée', description: 'La commande a été livrée.', icon: Home }
]

// Function to handle command tracking on button click
const trackCommand = () => {
  if (!commandIdInput.value.trim()) {
    return // Don't track if input is empty
  }
  
  // Update the tracked command ID
  trackedCommandId.value = commandIdInput.value.trim()
  
  // Generate a random status (1-4) each time the button is clicked
  currentStep.value = Math.floor(Math.random() * 4) + 1
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4 mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center">Suivi de commande</h2>

    <!-- Command ID Input -->
    <div class="mb-8 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 max-w-md mx-auto">
      <label for="commandId" class="sr-only">Numéro de commande</label>
      <input
        id="commandId"
        ref="commandIdInputRef"
        v-model="commandIdInput"
        type="text"
        placeholder="Entrez numéro de commande"
        class="flex-grow border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        @keyup.enter="trackCommand"
      />
      <button
        type="button"
        class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!commandIdInput.trim()"
        @click="trackCommand"
      >
        Suivre
      </button>
    </div>

    <!-- Show tracked command ID only after clicking the button -->
    <div v-if="trackedCommandId" class="text-center text-sm text-gray-600 mb-6">
      Numéro de commande : <span class="font-mono font-medium text-gray-800">{{ trackedCommandId }}</span>
    </div>

    <!-- Stepper - only show if a command is being tracked -->
    <div v-if="trackedCommandId">
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

    <!-- Message when no command is being tracked -->
    <div v-else class="text-center text-gray-500 py-8">
      Entrez un numéro de commande et cliquez sur "Suivre" pour voir le statut.
    </div>
  </div>
</template>