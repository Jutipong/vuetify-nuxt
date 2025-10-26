<script setup lang="ts">
import type { ProductServer, ProductProductServerRequest, ProductProductServerSearchResponse } from '../../shared/types/ProductServer'

const state = reactive<ProductProductServerSearchResponse>({
products: [] as ProductServer[],
total: 0,
message: '',
limit: 0,
skip: 0,
})
// const products = ref<ProductServer[]>([])
// const total = ref(0)
const authStore = useAuthStore()

async function getMessage() {

// mod to 1 or 2
// const searchRandom = Math.random() < 0.5 ? 'iphone' : 'android';

    const req : ProductProductServerRequest = { q: "android", limit: 5, skip: 0 }
/*products/search?q=${state.search.brand ?? ''}
    &limit=${table.options.itemsPerPage}&skip=${table.options.itemsPerPage * (table.options.page - 1)}`*/
  const data = await $fetch<ProductProductServerSearchResponse>('/api/post',{ 
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    },
    body: req
  })

  Object.assign(state, data)
  
  state.message = `Found ${data.total} products`
}

</script>

<template>
  <v-container>
    <VBtn color="warning" prepend-icon="mdi-refresh" text="Load Products"  @click="getMessage()"/>
    <br>
    <div>{{ state.message }}</div>
    <br>
    
    <v-row v-if="state.products && state.products.length > 0">
      <v-col v-for="product in state.products" :key="product.id" cols="12" md="4">
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