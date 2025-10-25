<script lang="ts" setup>
const { isLoading } = storeToRefs(useAppStore())

const state = reactive({ search: {} as Product })

// interface Api {
//     dataUrl1: any
//     dataUrl2: any
//     dataUrl3: any
// }
// const state2 = reactive<Api>({
//     dataUrl1: null,
//     dataUrl2: null,
//     dataUrl3: null,
// })
// const [data1, data2, data3] = await Promise.all([
//     api.Get(`https://dummyjson.com/products/search?q=%20%20%20%20&limit=2&skip=0`),
//     api.Get(`https://dummyjson.com/products/search?q=%20%20%20%20&limit=4&skip=0`),
//     api.Get(`https://dummyjson.com/products/search?q=%20%20%20%20&limit=6&skip=0`),
// ])

// state2.dataUrl1 = data1
// state2.dataUrl2 = data2
// state2.dataUrl3 = data3

const { table, onSubmit, onPageChange, onSortByChange, onPageLengthChange } = useDataTable<Product>(
    [
        { title: 'ID', key: 'id', align: 'center' },
        { title: 'Title', key: 'title' },
        { title: 'PRICE', key: 'price', align: 'end' },
        { title: 'RATING', key: 'rating', align: 'end' },
        { title: 'STOCK', key: 'stock', align: 'end' },
        { title: 'BRAND', key: 'brand', align: 'end' },
        { title: 'Actions', key: 'Action', sortable: false },
    ],
    [{ key: 'id', order: 'asc' }],
    async () => {
        
        const { products, total } = await api.Get<{ products: Product[], total: number }>
        (`products/search?q=${state.search.brand ?? ''}
    &limit=${table.options.itemsPerPage}&skip=${table.options.itemsPerPage * (table.options.page - 1)}`)

        table.result.items = products
        table.result.itemsLength = total
    },
)

const func = {
    onDelete: async (obj: Product) => {
        if (!await _confirm.Delete(`Confirm Delete`, `Delete '${obj.brand}'`))
            return

        _notify.Success(`delete ${obj.title} success`)
        _alert.Success('Successful', `delete ${obj.title} success`)
    },
}

onMounted(() => onSubmit())

defineExpose({
    onSearch: async (productSearch: Product) => {
        state.search = { ...productSearch }
        onSubmit()
    },
})
</script>

<template>
    <VCard>
        <VCardTitle>
            <VRow>
                <VCol md="6">
                    <VChip color="success" prepend-icon="mdi-package-variant-closed" label>
                        Product
                    </VChip>
                </VCol>
                <VCol class="text-right" md="6">
                    <ProductModal>
                        <template #activator="{ props, onClick }">
                            <VBtn v-bind="props" color="success" prepend-icon="mdi-plus" text="Add" @click="onClick" />
                        </template>
                    </ProductModal>
                </VCol>
            </VRow>
        </VCardTitle>

        <VDivider />

        <VCardText>
            <VDataTableServer
                :headers="table.headers"
                v-bind="{ ...table.options, ...table.result }"
                :loading="isLoading"
                @update:page="onPageChange"
                @update:sort-by="onSortByChange"
                @update:items-per-page="onPageLengthChange"
            >
                <template #item.Action="{ item }">
                    <ProductModal :product="item">
                        <template #activator="{ props, onClick }">
                            <VIcon v-bind="props" color="primary" icon="mdi-pencil" class="me-2" @click="onClick" />
                        </template>
                    </ProductModal>
                    <VIcon color="error" icon="mdi-delete" @click="func.onDelete(item)" />
                </template>

                <template #loading>
                    <v-skeleton-loader type="table-row@10" />
                </template>
            </VDataTableServer>
        </VCardText>
    </VCard>
</template>
