<script setup lang="ts">
const { isLoading } = storeToRefs(useAppStore())
</script>

<template>
    <!-- util component -->
    <VConfirm />
    <VValert />
  
 <v-overlay v-model="isLoading" class="align-center justify-center" persistent>
        <v-card>
            <v-card-text class="text-center">
                <v-progress-circular size="40" color="success" indeterminate />
                <p class="mt-2">
                    Loading....
                </p>
            </v-card-text>
        </v-card>
    </v-overlay>

  <NuxtLayout>
    <!-- page component -->
    <NuxtPage />


   
  </NuxtLayout>
</template>
