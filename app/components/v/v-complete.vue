<script lang="ts" setup>
interface Item {
    code: string
    name: string
}

interface Props {
    disabled?: boolean
    items?: Item[]
}

const { disabled = false, items = [] } = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()
const vModel = defineModel<string | null>()
const state = ref<string | null>(null)

onMounted(() => {
    watchDebounced(() => vModel.value, (newValue) => {
        const result = items.find(item => item.code === newValue)

        if (!result) {
            state.value = null
            emit('update:modelValue', null)
            return
        }

        state.value = result.code
    }, {
        debounce: 500,
    })

    watch(() => state.value, (newValue, oldValue) => {
        if (newValue === oldValue)
            return

        emit('update:modelValue', newValue ?? null)
    })

    watch(() => items, (newValue, oldValue) => {
        if (newValue.length === oldValue.length)
            return

        const result = newValue.find(item => item.code === vModel.value)

        if (!result) {
            state.value = null
            emit('update:modelValue', null)
            return
        }

        state.value = result.code
    })
})
</script>

<template>
    <div>
        <VAutocomplete
            v-model="state"
            :disabled="disabled"
            clearable
            item-title="name"
            item-value="code"
            :items="items"
        />
    </div>
</template>
