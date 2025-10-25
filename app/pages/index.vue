<script setup lang="ts">
import type { ProductServer, ProductProductServerRequest, ProductProductServerSearchResponse } from '../../types/ProductServer'

const message = ref('')
const products = ref<ProductServer[]>([])
const total = ref(0)
const authStore = useAuthStore()

async function getMessage() {
    const req : ProductProductServerRequest = { q: 'phone', limit: 5, skip: 0 }

  const { data } = await useFetch('/api/hello', {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    },
    method: 'GET',
  })

  
  console.log(data.value);
  
  if (data.value) {
    products.value = data.value.products
    total.value = data.value.total
    message.value = `Found ${data.value.total} products`
  }
}

</script>

<template>
  <v-container>
    <VBtn color="warning" prepend-icon="mdi-refresh" text="Load Products"  @click="getMessage()"/>
    <br>
    <div>{{ message }}</div>
    <br>
    
    <v-row v-if="products.length > 0">
      <v-col v-for="product in products" :key="product.id" cols="12" md="4">
        <v-card>
          <v-img :src="product.thumbnail" height="200" cover></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>${{ product.price }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>