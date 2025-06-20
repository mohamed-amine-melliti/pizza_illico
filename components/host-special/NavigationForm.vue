<template>
  <nav class="flex pt-12 text-xs font-semibold text-zinc-400 w-full">
    <ul class="flex flex-wrap gap-1.5 justify-center items-center p-2.5 w-full bg-black">
      <li 
        v-for="(label, index) in Object.keys(stepMap)" 
        :key="index" 
        class="flex-2 shrink"
      >
        <button 
          :class="[
            'gap-1.5 self-stretch px-10 py-1.5 my-auto min-h-[23px] rounded transition-all duration-300',
            selectedItem === stepMap[label] ? 'bg-white text-black' : 'bg-neutral-800 text-zinc-400 hover:bg-gray-700'
          ]" 
          @click="handleNavigation(label)"
        >
          {{ label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Ensure the navigation bar spans across the full width of the screen on large devices */
@media (min-width: 1024px) {
  nav {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';


let {
  loadFromLocalStorage,
  localStorage
} = useCreateListing();



export default defineComponent({
  name: 'NavigationForm',
  props: {
    currentStep: {
      type: String,
      required: true
    },
    onStepChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const stepMap = {
      'Getting Started': STEPS.GETTINGSTARTED,
      'Choix': STEPS.CHOICE,
      'Pizza': STEPS.PIZZA,
      'Tex Mex': STEPS.TEXMEX,
      'Panini': STEPS.PANINI,
      'Tortillas': STEPS.TORTIALLAS,
      'Conbos': STEPS.COMBOS,
      'Extras': STEPS.EXTRAS,
      'Addresse': STEPS.FULLADDRESS,
      'Prix': STEPS.PRICE,
      'Confirmer': STEPS.ORDER
    };

    const selectedItem = ref(props.currentStep); // Track the active step

    watch(() => props.currentStep, (newStep) => {
      selectedItem.value = newStep; // Update when prop changes
    });

    function handleNavigation(label: string) {
      const stepValue = stepMap[label];
      selectedItem.value = stepValue; // Update selection locally
      props.onStepChange(stepValue); // Notify parent component

      console.log('localstorage',localStorage.getItem(STEPS_KEY))
    }

    return {
      stepMap,
      selectedItem,
      handleNavigation
    };
  }
});
</script>
