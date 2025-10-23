<script setup lang="ts">
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const props = defineProps<{
    label?: string
    disabled?: boolean
    min?: unknown
    max?: unknown
    locale_multiple?: boolean
    modelValue: Date | null | undefined
}>()

const emit = defineEmits<{ 'update:modelValue': [value: Date | null] }>()

dayjs.extend(buddhistEra)

const locale = ref<'en' | 'th'>('en')
const stateDate = ref<Date | null>(props.modelValue ?? null)
const textDisplay = ref<string>('')
const menu = ref<boolean>(false)

function init(): void {
    dayjs.locale(locale.value)
    updateDateDisplay(stateDate.value)
}
init()

function formatDate(date: Date | null): string {
    if (!date)
        return ''

    return dayjs(date)
        .locale(locale.value)
        .format(locale.value === 'th' ? 'DD/MM/BBBB' : 'DD/MM/YYYY')
}

function updateDateDisplay(date: Date | null): void {
    if (!date) {
        textDisplay.value = ''
        emit('update:modelValue', null)
        return
    }

    textDisplay.value = formatDate(date)
    emit('update:modelValue', date)
}

function clearDate(): void {
    stateDate.value = null
    textDisplay.value = ''
    emit('update:modelValue', null)
}

function onDateSelected(value: Date | null): void {
    if (value === null) {
        clearDate()
        return
    }

    stateDate.value = value
    menu.value = false
}

function toggleLocale(): void {
    locale.value = locale.value === 'en' ? 'th' : 'en'
}

watch(locale, (newLocale) => {
    dayjs.locale(newLocale)
    updateDateDisplay(stateDate.value)
})

watch(stateDate, (newVal) => {
    updateDateDisplay(newVal)
})
</script>

<template>
    <div class="d-flex flex-column">
        <VLocaleProvider :locale="locale">
            <VMenu
                v-model="menu"
                :close-on-content-click="false"
                :close-on-backdrop-click="true"
                min-width="0"
            >
                <template #activator="{ props: textFieldProps }">
                    <v-text-field
                        v-bind="textFieldProps"
                        v-model="textDisplay"
                        :label="label"
                        :disabled="disabled"

                        clearable readonly
                        @click:clear="clearDate"
                    >
                        <template #append-inner>
                            <VTooltip v-if="locale_multiple" text="Change Locale" location="top">
                                <template #activator="{ props: tooltipProps }">
                                    <div
                                        ml-1 mr-1 cursor-pointer
                                        v-bind="tooltipProps"
                                        @click.stop="toggleLocale"
                                    >
                                        {{ locale === 'th' ? 'ไทย' : 'EN' }}
                                    </div>
                                </template>
                            </VTooltip>

                            <VIcon ml-1 mr-1>
                                mdi-calendar
                            </VIcon>
                        </template>
                    </v-text-field>
                </template>

                <VDatePicker
                    v-model="stateDate"
                    show-adjacent-months
                    :min="min"
                    :max="max"
                    color="primary"
                    hide-header
                    :locale="locale"
                    @update:model-value="onDateSelected"
                />
            </VMenu>
        </VLocaleProvider>
    </div>
</template>
