<script setup lang="ts">
import { ref } from 'vue'
import { cache } from '@/utils/cache'
// import api from '@/utils/api'

const cacheResult = ref<any>(null)
const apiResult = ref<any>(null)
const loading = ref(false)
const cacheSize = ref(0)

// Basic cache operations
function setCache() {
    const testData = {
        message: 'Hello Cache!',
        timestamp: new Date().toISOString(),
        randomNumber: Math.floor(Math.random() * 1000),
    }

    cache.set('test-data', testData, { ttl: '2min' })
    cacheResult.value = 'Data cached successfully!'
    getCacheStats()
}

function getCache() {
    const data = cache.get('test-data')
    cacheResult.value = data || 'No data found in cache'
}

function deleteCache() {
    cache.delete('test-data')
    cacheResult.value = 'Cache deleted'
    getCacheStats()
}

function clearCache() {
    cache.clear()
    cacheResult.value = 'All cache cleared'
    getCacheStats()
}

function getCacheStats() {
    cacheSize.value = cache.size()
}

// API with cache examples
async function fetchWithCache() {
    loading.value = true
    try {
    // Simulate API call with cache
        const cacheKey = 'api-users-list'
        let result = cache.get(cacheKey)

        if (!result) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            result = {
                users: [
                    { id: 1, name: 'John Doe', email: 'john@example.com' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
                    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
                ],
                timestamp: new Date().toISOString(),
                cached: false,
            }

            cache.set(cacheKey, { ...result, cached: true }, { ttl: '5min' })
        }
        else {
            result.cached = true
        }

        apiResult.value = result
    }
    catch (error) {
        console.error('API Error:', error)
        apiResult.value = { error: 'Failed to fetch data' }
    }
    finally {
        loading.value = false
    }
}

async function fetchWithoutCache() {
    loading.value = true
    try {
    // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        apiResult.value = {
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
            ],
            timestamp: new Date().toISOString(),
            cached: false,
        }
    }
    catch (error) {
        console.error('API Error:', error)
        apiResult.value = { error: 'Failed to fetch data' }
    }
    finally {
        loading.value = false
    }
}

// Initialize
onMounted(() => {
    getCacheStats()
})
</script>

<template>
    <VContainer>
        <VRow>
            <VCol cols="12">
                <h2>Cache Example</h2>

                <VCard class="mb-4">
                    <VCardTitle>Basic Cache Operations</VCardTitle>
                    <VCardText>
                        <VBtn color="primary" class="me-2" @click="setCache">
                            Set Cache
                        </VBtn>
                        <VBtn color="secondary" class="me-2" @click="getCache">
                            Get Cache
                        </VBtn>
                        <VBtn color="error" class="me-2" @click="deleteCache">
                            Delete Cache
                        </VBtn>
                        <VBtn color="warning" @click="clearCache">
                            Clear All
                        </VBtn>

                        <VAlert v-if="cacheResult" type="info" class="mt-4">
                            <strong>Cache Result:</strong> {{ cacheResult }}
                        </VAlert>
                    </VCardText>
                </VCard>

                <VCard class="mb-4">
                    <VCardTitle>API with Cache</VCardTitle>
                    <VCardText>
                        <VBtn color="success" class="me-2" :loading="loading" @click="fetchWithCache">
                            Fetch with Cache (5min)
                        </VBtn>
                        <VBtn color="info" class="me-2" :loading="loading" @click="fetchWithoutCache">
                            Fetch without Cache
                        </VBtn>

                        <VAlert v-if="apiResult" type="success" class="mt-4">
                            <strong>API Result:</strong>
                            <pre>{{ JSON.stringify(apiResult, null, 2) }}</pre>
                        </VAlert>
                    </VCardText>
                </VCard>

                <VCard>
                    <VCardTitle>Cache Stats</VCardTitle>
                    <VCardText>
                        <p><strong>Cache Size:</strong> {{ cacheSize }} items</p>
                        <VBtn color="info" size="small" @click="getCacheStats">
                            Refresh Stats
                        </VBtn>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
</template>
