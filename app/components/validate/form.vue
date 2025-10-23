<script lang="ts" setup>
const state = reactive({
    title: '',
    price: 0,
    rating: 0,
    stock: 0,
    brand: '',
    discountPercentage: 0,
    level2: {
        msg: null,
        msg2: null,
        level3: {
            msg: null,
            msg2: null,
        },
    },

})

const { zErrors, zValidate, zReset } = useZod(z.object({
    title: requiredString('Title is required'),
    // price: requiredNumber('Price is required'),
    // rating: requiredNumber('Rating is required'),
    level2: z.object({
        msg: requiredString('Level 2 msg is required'),
        msg2: requiredString('Level 2 msg2 is required'),
        level3: z.object({
            msg: requiredString('Level 3 msg is required'),
            msg2: requiredString('Level 3 msg2 is required'),
        }),
    }),

}), state)

function onSubmit() {
    if (!zValidate())
        return

    _alert.Success('Successful', `Submit data successfully`)
    zReset()
}
</script>

<template>
    <VForm @submit.prevent="onSubmit()">
        <VCard>
            <VCardTitle>
                <VChip color="success" prepend-icon="mdi-plus">
                    Create Product
                </VChip>
            </VCardTitle>

            <VCardText>
                state:{{ state }}
                <br>
                error:{{ zErrors }}
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.title" :error-messages="zErrors?.title" label="Title" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="state.price" :error-messages="zErrors?.price" label="Price" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="state.rating" :error-messages="zErrors?.rating" label="rating" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="state.stock" :error-messages="zErrors?.stock" label="stock" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.brand" label="Brand" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="state.discountPercentage" :error-messages="zErrors?.discountPercentage" label="Discount" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.level2.msg" :error-messages="zErrors.level2?.msg" label="level2?.msg" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.level2.msg2" :error-messages="zErrors.level2?.msg2" label="level2?.msg2" />
                    </VCol>
                    <VCol cols="12" md="4" />
                </VRow>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.level2.level3.msg" :error-messages="zErrors.level2?.level3?.msg" label="level3.msg" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="state.level2.level3.msg2" :error-messages="zErrors.level2?.level3?.msg2" label="level3.msg2" />
                    </VCol>
                    <VCol cols="12" md="4" />
                </VRow>
            </VCardText>

            <VCardActions class="justify-end">
                <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="zReset()" />
                <VBtn color="primary" prepend-icon="mdi-content-save" text="Save" type="submit" />
            </VCardActions>
        </VCard>
    </VForm>
</template>
