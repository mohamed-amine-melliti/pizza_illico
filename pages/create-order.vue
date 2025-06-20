<script setup lang="ts">
import { ref } from 'vue';
import { toRaw } from 'vue';
import AccommodationSelection from '~/components/host-special/PizzaSelection.vue';
import RoomAmenities from '~/components/host-special/RoomAmenities.vue';
import PropertyAccessories from '~/components/host-special/PropertyAccessories.vue';
import RoomInfoForm from '~/components/host-special/room-info-form/RoomInfoForm.vue';
import PropertyGuidelines from '~/components/host-special/room-info-form/PropertyGuidelines.vue';
import GettingStarted from '~/components/host-special/GettingStarted.vue';
import FullAddress from '~/components/host-special/FullAddress.vue';
import NavigationForm from '~/components/host-special/NavigationForm.vue'; // Import NavigationForm
import { categories, things, buttons } from '~/data/constants';
import Counter from '~/components/Counter.vue';
import TexMexSelection from '~/components/host-special/TexMexSelection.vue';
import PaninisSelection from '~/components/host-special/PaninisSelection.vue';

let {
  orderValues,
  isLoading,
  steps,
  errors,
  onBack,
  onNext,
  //add,
  //reduce,
  OrderPizzaSelected,
  OrderPaniniSelected,
  createOrder,
  OrderTexMexSelected,
  setMapLibreLocation,
} = useCreateListing();

useSeoMeta({
  title: 'Create Order',
});

// Define state variables
const selectedButton = ref<string | null>(null); // This will store the selected button label
const currentStep = ref(STEPS.GETTINGSTARTED); // Current step

// Handle step change emitted by the child component
function handleStepChange(step: number) {
  console.log('Step changed to:', step);
  steps.value = step;
}

function categorySelected(label: string) {
  const index = orderValues.Choice.indexOf(label);
  if (index > -1) {
    orderValues.Choice.splice(index, 1); // Remove if already selected
  } else {
    orderValues.Choice.push(label); // Add if not selected
  }

  console.log('orderValues Category:', orderValues);
}


const formValues = ref<Record<string, any>>({});
const geocode = ref<{ lat: number; lon: number } | null>(null);

const handleGeocode = (geocodeData: { lat: number; lon: number }) => {
  geocode.value = geocodeData; // Store the received geocode data
  console.log('Received Geocode Data:', geocodeData); // Debug or process the data as needed
  setMapLibreLocation(toRaw(geocodeData));
};

// Function to handle form data emitted by FullAddress
function handleFormChange(updatedForm: any) {
  formValues.value = updatedForm; // Update formValues with emitted data
  const rawData = toRaw(formValues.value); // Convert formValues to raw data
  // setFullAddress(rawData);
  console.log('Received Form Data:', rawData); // Debug or process the data as needed
}
</script>




<template>
  <div class="flex flex-col min-h-screen">

    <section class="relative w-full h-full max-w-2xl px-4 mx-auto my-6 mt-16 md:h-auto lg:h-auto md:px-0">
      <transition name="fade" mode="out-in">
        <div :key="steps">
          <!-- Step 1: Getting Started -->
          <div v-if="steps === STEPS.GETTINGSTARTED">
            <GettingStarted></GettingStarted>
            <Button class="bg-blue-500 text-white px-4 py-2 rounded-md" label="Next" @click="onNext" />
          </div>

          <!-- Step 2: Category Selection -->
          <div v-if="steps === STEPS.CHOICE">
            <Heading title="Choix " subTitle="Choisissez une ou plusieurs catégories" />
            <div class="grid grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-4">
              <CategoryInput v-for="category in categories" :key="category.label" :label="category.label"
                :icon="category.icon" :selected="orderValues.Choice.includes(category.label)"
                @categorySelect="categorySelected" />

            </div>

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>

          </div>

          <!-- Step 3: Accessories -->
          <div v-if="steps === STEPS.PIZZA && orderValues.Choice.includes('Pizza')">
            <Heading title="Choisir Vos Pizza Préféré ..." subTitle="Choisissez une ou plusieurs catégories" />
            <div>
              2

              <AccommodationSelection @AccommodationSelectionSelected="setAccommodationSelectionSelected">
              </AccommodationSelection>
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>

          <!-- Step 4: Specifications -->
          <div v-if="steps === STEPS.TEXMEX && orderValues.Choice?.includes('Tex Mex')">
            <Heading title="Enter your Property specifications ..." subTitle="Choisissez une ou plusieurs catégories" />
            <div>
              <TexMexSelection></TexMexSelection>
              <!-- <RoomInfoForm @RoomInfoFormSelected="setRoomInfoFormSelected"></RoomInfoForm> -->
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>

          <!-- Step 5: Hosting Options -->
          <div v-if="steps === STEPS.PANINI && orderValues.Choice?.includes('Paninis')">
            <Heading title="What type of panini will your guests have?"
              subTitle="Choisissez une ou plusieurs catégories" />
            <div>
              <PaninisSelection></PaninisSelection>
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button class="bg-blue-500 hover:bg-blue-600 text-white" label="Next" @click="onNext" />
            </div>
          </div>
          <!-- Step 6: Room Amenities -->
          <div v-if="steps === STEPS.TORTIALLAS || true">
            <Heading title="Choose your Room Amenities ..." subTitle="Choisissez une ou plusieurs catégories" />
            <div>

              <TortillasSelection></TortillasSelection>
              <!-- <RoomAmenities @RoomAmenitiesSelected="setRoomAmenitiesSelected"></RoomAmenities> -->
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>

          <!-- Step 7: Things -->
          <div v-if="steps === STEPS.COMBOS">
            <Heading title="Tell the guest What you have in the place?"
              subTitle="Please choose what amenities you have?" />
            <div class="grid grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
              6
              <!-- <CategoryInput v-for="thing in things" :key="thing.label" :selected="orderValues.category === thing.label"
              @categorySelect="categorySelected" :label="thing.label" :icon="thing.icon" /> -->
            </div>
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>

          <!-- Step 8: Images -->
          <div v-if="steps === STEPS.EXTRAS">
            <Heading title="Add a photo of your place" subTitle="What you have in the place?" />
            7
            <!-- <ClientOnly> -->
            <!-- <ImageUploadForListingCreation v-model="orderValues.imageSrc" @imagePublicId="imagePublicId" /> -->
            <!-- </ClientOnly> -->
            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button label="Next" @click="onNext" style="background-color: blue;" />
            </div>
          </div>

          <!-- Step 9: Location -->
          <div v-if="steps === STEPS.FULLADDRESS">
            <Heading title="Where is your place located?" subTitle="Help guests find you!" />
            <!-- <ClientOnly> -->
            <div class="component-container">
              8
              <!-- <MapLibreLocation @update:geocode="handleGeocode" />
              <CountrySelect :selectedCountry="orderValues?.locationValue" @countrySelect="locationSelected" />
              <FullAddress @formChange="handleFormChange" /> -->
            </div>
            <!-- <Map :center="orderValues?.locationValue?.latlng" /> -->
            <!-- </ClientOnly> -->

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>

          <!-- Step 10: Type -->
          <div v-if="steps === STEPS.PRICE">
            <Heading title="Choose What type of rental you offer?" subTitle="What type of rental you offer?" />
            9

            <div class="flex flex-col gap-4 md:flex-row pt-4">
              <Button label="Back" outline @click="onBack" />
              <Button style="background-color: blue;" label="Next" @click="onNext" />
            </div>
          </div>
          <!----------------------------------------------------------->
          <div class="flex flex-col gap-8" v-if="steps === STEPS.ORDER">
            <section class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                <article class="flex flex-col self-stretch my-auto min-w-[240px] w-[342px] max-md:w-full">
                  <header class="flex flex-col w-full">
                    <h2 class="text-sm font-bold leading-none text-neutral-500">Step 3</h2>
                    <h1 class="mt-4 text-4xl font-semibold leading-[50px] text-slate-800">
                      Finish up and publish
                    </h1>
                  </header>
                  <p class="mt-8 text-lg text-black max-md:mt-6">
                    Finally, you'll choose booking settings...
                  </p>
                </article>
                <div class="relative flex items-center justify-center w-[342px] h-[342px] max-md:w-full max-md:h-auto">
                  <video loading="eager" src="public/finish.gif"
                    alt="Illustration representing the finish and publish step"
                    class="object-contain self-stretch my-auto aspect-square min-w-[240px] w-full h-full max-md:max-w-full"
                    autoplay muted loop></video>
                </div>
              </div>
            </section>

            <div class="flex flex-col gap-4 md:flex-row">
              <Button label="Back" outline @click="onBack" />
              <Button label="Create" @click="createOrder" style="background-color: blue;" />
            </div>
          </div>
          <!----------------------------------------------------------->
        </div>
      </transition>
    </section>
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
</style>