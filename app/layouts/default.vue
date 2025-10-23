<script setup lang="ts">
import LayoutsHeader from '~/components/layouts/Header.vue'
import LayoutsNavigation from '~/components/layouts/Navigation.vue'

const { mobile } = useDisplay()
const appStore = useAppStore()

const layoutCss = computed(() => {
    return {
        mini_nav: !mobile.value,
        full_nav: mobile.value,
    }
})
</script>

<template>
    <v-app :class="layoutCss">
        <v-progress-linear 
            :active="appStore.isProgressLoading" 
            style="z-index: 99999; position: fixed !important;" 
            color="success" 
            indeterminate 
        />

        <LayoutsHeader />
        <LayoutsNavigation />
        
        <v-main>
            <NuxtPage />
        </v-main>
    </v-app>
</template>

<style>
.v-label {
    color: rgb(var(--v-theme-primary));
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
