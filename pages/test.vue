<template>
    <div class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
            <Container>
                <Customize></Customize>
            </Container>
        </div>
    </div>
</template>


<script setup lang="ts">
import Container from '~/components/Ui/Container.vue';
import Customize from '~/components/order/Customize.vue';
</script>