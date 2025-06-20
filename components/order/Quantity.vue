<template>

    <Counter title="Guests" subtitle="How many guests do you allow?" :value="listingValues.guestCount" @add="add"
        @reduce="reduce" />
    <hr />
    <Counter title="Rooms" subtitle="How many rooms do you have?" :value="listingValues.roomCount" @add="add"
        @reduce="reduce" />
    <hr />
    <Counter title="Bathrooms" subtitle="How many bathrooms do you have?" :value="listingValues.bathroomCount"
        @add="add" @reduce="reduce" />

</template>


<script lang="ts">
import Counter from './Counter.vue';


</script>