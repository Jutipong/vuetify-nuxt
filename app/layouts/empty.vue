<script setup lang="ts">
const theme = useTheme()
const layoutStore = useLayoutStore()
theme.change(layoutStore.state.theme)
</script>

<template>
    <v-app>
        <v-main>
            <NuxtPage />
        </v-main>
    </v-app>
</template>
