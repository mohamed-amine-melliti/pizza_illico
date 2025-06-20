import { toRaw } from 'vue';


export enum STEPS {
  GETTINGSTARTED = 0,
  CHOICE = 1,
  PIZZA = 2,
  TEXMEX = 3,
  PANINI = 4,
  TORTILLAS = 5,
  COMBOS = 6,
  EXTRAS = 7,
  FULLADDRESS = 8,
  PRICE = 9,
  ORDER = 10
}
export const STEP_LABELS = {
  [STEPS.GETTINGSTARTED]: 'GETTING STARTED',
  [STEPS.PIZZA]: 'PIZZA',
  [STEPS.TEXMEX]: 'TEXMEX',
  [STEPS.PANINI]: 'PANINI',
  [STEPS.TORTILLAS]: 'TORTILLAS',
  [STEPS.COMBOS]: 'COMBOS',
  [STEPS.EXTRAS]: 'EXTRAS',
  [STEPS.ORDER]: 'ORDER',
};
//const toast = useToast()
const STORAGE_KEY = 'orderValues'
const EXPIRATION_KEY = 'orderValuesExpiration'
const STEPS_KEY = 'listingSteps'
export function useCreateListing() {
  const orderValues = reactive({
    Choices: [] as string[],

    Choice: [] as string[],
    OrderPizza: '',
    OrderPanini: '',
    OrderTexMex: '',
    OrderTortillas: '',
    ExtrasForPizza: '',
    ExtrasForPanini: '',
    ExtrasForTexMex: '',
    ExtrasForTortillas: '',
    Combo: '',
    MapLibreLocation: '',        // New function for map location
    FullAddress: '',             // New function for full address
  });
  const isLoading = ref(false)
  const steps = ref(STEPS.GETTINGSTARTED)
  const errors = reactive<{ [key: string]: string }>({
    address: '',
    description: '',
    price: '',
  })

  function onBack() {
    steps.value--
    saveToLocalStorage()
  }

  function onNext() {
    if (steps.value === STEPS.ORDER ) return
    steps.value++
    saveToLocalStorage()
  }

  function validPrice() {
    if (typeof orderValues.FullAddress !== 'string' ) {
      errors.address = 'Adresse doit être valide'
      return false
    }
    errors.address = ''
    return true
  }
  async function createOrder() {
    if (steps.value !== STEPS.ORDER) return;
    if (!validPrice()) return;
  
    try {
      isLoading.value = true;
  
      // `$fetch` directly returns the response data (not an HTTP response object)
      const res = await $fetch('/api/v1/listings/create', {
        method: 'POST',
        body: orderValues,
      });
  
      // If the request was successful, assume the listing was created
      //toast.success('Listing created!');
      clearLocalStorage();
      return navigateTo('/');
    } catch (error) {
      console.error(error);
      //toast.error(error?.data?.message || 'An error occurred');
    } finally {
      isLoading.value = false;
    }
  }

  function OrderPizzaSelected(OrderPizza: string) {
    orderValues.OrderPizza = OrderPizza
    saveToLocalStorage()
  }

  function OrderPaniniSelected(OrderPanini: string) {
    orderValues.OrderPanini = OrderPanini
    saveToLocalStorage()
  }

  function OrderTexMexSelected(OrderTexMex: string) {
    orderValues.OrderTexMex = OrderTexMex
  }

  function OrderTortillasSelected(Tortilla: string) {
    orderValues.OrderTortillas = Tortilla
  }

  // function add(title: string) {
  //   if (title === 'Guests') {
  //     orderValues.guestCount++
  //   } else if (title === 'Rooms') {
  //     orderValues.roomCount++
  //   } else {
  //     orderValues.bathroomCount++
  //   }
  //   saveToLocalStorage()
  // }

  // function reduce(title: string) {
  //   if (title === 'Guests' && orderValues.guestCount > 1) {
  //     orderValues.guestCount--
  //   } else if (title === 'Rooms' && orderValues.roomCount > 1) {
  //     orderValues.roomCount--
  //   } else if (title === 'Bathrooms' && orderValues.bathroomCount > 1) {
  //     orderValues.bathroomCount--
  //   }
  //   saveToLocalStorage()
  // }

  function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderValues))
    localStorage.setItem(STEPS_KEY, steps.value.toString())
    localStorage.setItem(EXPIRATION_KEY, (Date.now() + 15 * 60 * 1000).toString())
  }

  function loadFromLocalStorage() {
    const savedValues = localStorage.getItem(STORAGE_KEY)
    const savedSteps = localStorage.getItem(STEPS_KEY)
    const expiration = localStorage.getItem(EXPIRATION_KEY)

    if (savedValues && savedSteps && expiration && Date.now() < parseInt(expiration)) {
      Object.assign(orderValues, JSON.parse(savedValues))
      steps.value = parseInt(savedSteps)
    } else {
      clearLocalStorage()
    }
  }

  function clearLocalStorage() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STEPS_KEY)
    localStorage.removeItem(EXPIRATION_KEY)
  }

  function setMapLibreLocation(MapLibreLocation: any) {
    orderValues.MapLibreLocation = MapLibreLocation;
    console.log(orderValues.MapLibreLocation)
    saveToLocalStorage()

  }
  /////////////////////////////////////
  if (import.meta.client) {
    loadFromLocalStorage()
  }

  return {
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
  }
}
