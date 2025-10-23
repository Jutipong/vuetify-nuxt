<script lang="ts" setup>
const state = reactive({
    item1: [{ code: '1', name: 'item1' }, { code: '2', name: 'item2' }, { code: '3', name: 'item3' }],
    value1: null,

    value2: '',
})

const option2 = computed(() => {
    const master = [{ code: '1', name: 'item1.1' }, { code: '3', name: 'item3.3' }]
    const result = master.filter(item => item.name.includes(state.value1 ?? ''))
    return result
})
</script>

<template>
    <div>
        <VCard>
            <VCardText>
                <VRow>
                    <VCol cols="12" md="6">
                        <VVComplete v-model="state.value1" :items="state.item1" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <!-- <VAutocomplete v-model="option2" /> -->
                        <VVComplete v-model="state.value2" :items="option2" />
                    </VCol>
                </VRow>
            </VCardText>

            <VCardText>
                <VRow>
                    <VCol cols="6">
                        value1: <VTextField v-model="state.value1" />
                        <!-- value1: {{ state.value1 }} -->
                    </VCol>
                    <VCol cols="6">
                        value2: <VTextField v-model="state.value2" />
                    </VCol>
                </VRow>
            </VCardText>
        </VCard>
    </div>
</template>
