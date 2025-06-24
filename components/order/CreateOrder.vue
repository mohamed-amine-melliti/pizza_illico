<script setup lang="ts">
import { ref, reactive, toRaw, h } from 'vue';

// UI & Toast
import { useToast } from '../Ui/toast/use-toast';
const { toast } = useToast();

// Components
import GettingStarted from '~/components/host-special/GettingStarted.vue';
import FullAddress from '~/components/host-special/FullAddress.vue';
import NavigationForm from '~/components/host-special/NavigationForm.vue';
import PizzaSelection from '~/components/host-special/PizzaSelection.vue';
import TexMexSelection from '../host-special/TexMexSelection.vue';
import PaninisSelection from '../host-special/PaninisSelection.vue';
import TortillasSelection from '../host-special/TortillasSelection.vue';
import ComboSelection from '../host-special/ComboSelection.vue';
import ExtraSelection from '../host-special/ExtraSelection.vue';

// Order state & composables
let {
  Choice,
  orderValues,
  isLoading,
  steps,
  errors,
  onBack,
  onNext,
  OrderPizzaSelected,
  OrderPaniniSelected,
  createOrder,
  OrderTexMexSelected,
  setMapLibreLocation,
} = useCreateListing();

useSeoMeta({
  title: 'Create Order',
});

// -----------------------
// Refs and Reactive State
// -----------------------
const selectedButton = ref<string | null>(null);
const currentStep = ref(STEPS.GETTINGSTARTED);
const selectedCategories = ref<string[]>([]);
let finalChoices: string[] = [];

const form = reactive({
  country: '',
  city: '',
  postalCode: '',
  street: '',
  streetNumber: ''
});

const formValues = ref<Record<string, any>>({});
const geocode = ref<{ lat: number; lon: number } | null>(null);

// -----------------------
// Selection States
// -----------------------
const selectedTexmexItems = ref<{ id: number; size: string; price: number }[]>([]);
const texmexTotalPrice = ref<number>(0);
const selectedPaninis = ref<{ index: number; name: string; price: number }[]>([]);
const paniniTotalPrice = ref<number>(0);
const selectedTortillas = ref<{ index: number; name: string; price: number }[]>([]);
const tortillaTotalPrice = ref<number>(0);
// -----------------------
// Selection Handlers
// -----------------------
function handleTexmexSelection(payload: { selected: typeof selectedTexmexItems.value; totalPrice: number }) {
  selectedTexmexItems.value = payload.selected;
  texmexTotalPrice.value = payload.totalPrice;
}

// function handlePaniniSelection(payload: { selected: typeof selectedPaninis.value; totalPrice: number }) {
//   selectedPaninis.value = payload.selected;
//   paniniTotalPrice.value = payload.totalPrice;
// }


function handleTortillaUpdate(payload: { selected: typeof selectedTortillas.value; totalPrice: number }) {
  selectedTortillas.value = payload.selected;
  tortillaTotalPrice.value = payload.totalPrice;
}


function handlePaniniSelection({ selected, totalPrice }) {
  console.log('Selected Paninis:', selected);
  console.log('Total Price:', totalPrice);
}
// -----------------------
// Category Logic
// -----------------------
if (orderValues.Choices.includes("Pizza")) {
  selectedCategories.value.push("Pizza");
  finalChoices.push("Pizza");
}

function toggleCategory(category: string) {
  const index = selectedCategories.value.indexOf(category);

  if (index === -1) {
    selectedCategories.value.push(category);
    finalChoices.push(category);
  } else {
    selectedCategories.value.splice(index, 1);
    finalChoices = finalChoices.filter(item => item !== category);
  }

  orderValues.Choices = toRaw(selectedCategories.value);
  console.log('selectedCategories:', selectedCategories.value);
  console.log('finalChoices:', finalChoices);
}

// -----------------------
// Step Handling
// -----------------------
function handleNext() {
  steps.value++;
}

function handleStepChange(newStep: number) {
  steps.value = newStep;
}

// -----------------------
// Form & Geocode Handlers
// -----------------------
function handleFormChange(updatedForm: any) {
  formValues.value = updatedForm;
  console.log('Received Form Data:', toRaw(formValues.value));
}

function handleGeocode(geocodeData: { lat: number; lon: number }) {
  geocode.value = geocodeData;
  console.log('Received Geocode Data:', geocodeData);
  setMapLibreLocation(toRaw(geocodeData));
}

// -----------------------
// Order Confirmation
// -----------------------
const ConfirmOrder = () => {
  toast({
    title: 'Order Created',
    description: 'The order was successfully created.',
    duration: 4000,
  });
};
</script>




<template>
  <div class="flex flex-col min-h-screen">
    <section class="relative w-full h-full max-w-2xl px-4 mx-auto my-6 mt-16 md:h-auto lg:h-auto md:px-0">
      <transition name="fade" mode="out-in">
        <div :key="steps">
          <!-- Step 1: Getting Started -->
          <div v-if="steps === STEPS.GETTINGSTARTED">
            <GettingStarted />
            <Button class="bg-blue-500 text-white px-4 py-2 rounded-md" label="Next" @click="handleNext" />
          </div>

          <!-- Step 2: Choice Selection -->
          <div v-if="steps === STEPS.CHOICE">
            <Heading title="Choix" subTitle="Choisissez une ou plusieurs catégories" />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-h-[90vh] overflow-y-auto py-4 px-2">

              <h1
                class="col-span-full text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight text-center mb-4">
                Naviguez pour choisir votre repas
              </h1>
              <!-- <CategoryInput v-for="category in categories" :key="category.label" :label="category.label"
                   :icon="category.icon" :defaultSelected="orderValues.Choices.includes(category.label)"
                    @categorySelect="toggleCategory" /> 
              -->
            </div>

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>


          <!-- Step 3: Pizza -->
          <div v-if="steps === STEPS.PIZZA">
            <Heading title="Choisir Vos Pizza Préférés ..." subTitle="Choisissez une ou plusieurs catégories" />
            <PizzaSelection @PizzaSelectionUpdated="pizzaSelectionChanged" />

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>

          <!-- Step 4: TexMex -->
          <div v-if="steps === STEPS.TEXMEX">
            <Heading title="Choisir Vos TexMex Préférés ..." subTitle="Choisissez une ou plusieurs catégories" />
            <TexMexSelection @texmexSelectionSelected="handleTexmexSelection" />
            <div v-if="selectedTexmexItems.length" class="mt-5 p-4 bg-gray-100 rounded-xl">
              <h3 class="text-lg font-bold">TexMex sélectionnés :</h3>
              <ul class="text-sm mt-2">
                <li v-for="item in selectedTexmexItems" :key="item.id">
                  ID: {{ item.id }}, Taille: {{ item.size }}, Prix: {{ item.price }}€
                </li>
              </ul>
              <p class="mt-2 text-green-700 font-semibold">Prix total : {{ texmexTotalPrice.toFixed(2) }}€</p>
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>


          <!-- Step 5: Panini -->
          <div v-if="steps === STEPS.PANINI">
            <Heading title="Choisir Vos Paninis Préférés ..." subTitle="Choisissez une ou plusieurs catégories" />
            <PaninisSelection  @menuSelectionSelected="handlePaniniSelection"/>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>


          <!-- Step 6: Tortillas -->
          <div v-if="steps === STEPS.TORTILLAS">
            <Heading title="Choisir Vos Tortillas Préférés ..." subTitle="Choisissez une ou plusieurs catégories" />
            <TortillaSelection @menuSelectionSelected="handleTortillaUpdate" />

            <div v-if="selectedTortillas.length" class="mt-5 p-4 bg-gray-100 rounded-xl">
              <h3 class="text-lg font-bold">Tortillas sélectionnées :</h3>
              <ul class="text-sm mt-2">
                <li v-for="item in selectedTortillas" :key="item.index">
                  {{ item.name }} — {{ item.price }}€
                </li>
              </ul>
              <p class="mt-2 text-green-700 font-semibold">Prix total : {{ tortillaTotalPrice.toFixed(2) }}€</p>
            </div>

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>

          <!-- Step 7: Combos -->
          <div v-if="steps === STEPS.COMBOS">
            <Heading title="Choisir Des combos?" subTitle="Ajouter ce que vous voulez :" />
            <ComboSelection />

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>

          <!-- Step 8: Images -->
          <div v-if="steps === STEPS.EXTRAS">
            <Heading title="Ajouter des extras ?" subTitle="What you have in the place?" />

            <ExtraSelection />
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button label="Next" @click="handleNext" style="background-color: blue;" />
            </div>
          </div>

          <!-- Step 9: Location -->
          <div v-if="steps === STEPS.FULLADDRESS">
            <Heading title="Where is your place located?" subTitle="Help guests find you!" />

            <div class="component-container space-y-6 mt-4">

              <!-- Address Group -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">Country</label>
                  <input v-model="form.country" type="text" placeholder="France"
                    class="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">City</label>
                  <input v-model="form.city" type="text" placeholder="Paris"
                    class="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Postal Code</label>
                  <input v-model="form.postalCode" type="text" placeholder="75001"
                    class="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Street</label>
                  <input v-model="form.street" type="text" placeholder="Rue de Rivoli"
                    class="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Street Number</label>
                  <input v-model="form.streetNumber" type="text" placeholder="12B"
                    class="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

            </div>

            <!-- Navigation Buttons -->
            <div class="flex flex-col gap-4 md:flex-row pt-6">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>


          <!-- Step 10: Type -->
          <div v-if="steps === STEPS.PRICE">
            <Heading title="Prix de votre commande ..." subTitle="Ceci est le montant à payer" />
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="handleNext" />
            </div>
          </div>

          <!-- Final Step: Order -->
          <div class="flex flex-col gap-8" v-if="steps === STEPS.ORDER">
            <section class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                <article class="flex flex-col self-stretch my-auto min-w-[240px] w-[342px] max-md:w-full">
                  <header class="flex flex-col w-full">
                    <h2 class="text-sm font-bold leading-none text-neutral-500">Step 3</h2>
                    <h1 class="mt-4 text-4xl font-semibold leading-[50px] text-slate-800">Compléter l'Ordre</h1>
                  </header>
                  <p class="mt-8 text-lg text-black max-md:mt-6">Finallement...</p>
                </article>
                <div class="relative flex items-center justify-center w-[342px] h-[342px] max-md:w-full max-md:h-auto">
                  <img
                    src="https://cdn.dribbble.com/users/3232028/screenshots/17250321/media/642c6f61b195e721ee4582d5b574e220.gif">
                </div>
              </div>
            </section>

            <div class="flex flex-col gap-4 md:flex-row">
              <Button label="Back" variant="outline" @click="onBack" />
              <Button label="Create" @click="ConfirmOrder" style="background-color: blue;" />
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- Navigation Form -->
    <NavigationForm :currentStep="currentStep" :onStepChange="handleStepChange" />
  </div>
</template>



<style>
input {
  border: none;
  outline: none;
  /* Removes the outline when input is focused */
}

/* Basic Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide Transition Example */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  /* Slide in from the right */
}

/* You can customize more animations depending on your needs */

/* Slide Transition Example */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  /* Slide in from the right */
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  /* After entering, return to original position */
}

.bg-gray-500 {
  background-color: #8e929e;
}

.border-black {
  border-color: #000;
}

.component-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* Adjust this value to control the spacing */
  padding: 10px;
  /* Optional: add some padding around the entire container */
}

@media (max-width: 768px) {
  .component-container {
    gap: 15px;
    /* Adjust the gap for smaller screens if needed */
    padding: 8px;
    /* Adjust the padding for smaller screens */
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>