<script setup lang="ts">
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

type LocaleType = 'en' | 'th'

const props = withDefaults(defineProps<{
    label?: string
    disabled?: boolean
    min?: Date | string
    max?: Date | string
    locale_multiple?: boolean
    modelValue?: string | null
    clearable?: boolean
    th_en_format?: string
}>(), {
    modelValue: null,
    th_en_format: 'DD/MM/YYYY',
    clearable: true,
})

const emit = defineEmits<{
    'update:modelValue': [value: Date | null]
    'update:string': [value: string | null]
}>()

dayjs.extend(buddhistEra)

const locale = ref<LocaleType>('en')
const stateDate = ref<Date | null>(convertStringToDate(props.modelValue))
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

    const format = locale.value === 'th' ? 'DD/MM/BBBB' : props.th_en_format
    return dayjs(date).locale(locale.value).format(format)
}

function convertStringToDate(value: string | null): Date | null {
    if (!value)
        return null

    const parsedDate = dayjs(value)
    return parsedDate.isValid() ? parsedDate.toDate() : null
}

function convertDateToString(value: Date | null): string | null {
    if (!value)
        return null

    const isValid = dayjs(value).isValid()
    if (!isValid)
        return null

    const format = locale.value === 'th' ? 'DD/MM/BBBB' : props.th_en_format
    return dayjs(value).locale(locale.value).format(format)
}

function updateDateDisplay(date: Date | null): void {
    if (!date) {
        textDisplay.value = ''
        emit('update:modelValue', null)
        emit('update:string', '')
        return
    }

    textDisplay.value = formatDate(date)
    emit('update:modelValue', date)
    emit('update:string', convertDateToString(date))
}

function clearDate(): void {
    stateDate.value = null
    updateDateDisplay(null)
}

function onDateSelected(value: Date | null): void {
    stateDate.value = value
    if (value)
        menu.value = false
}

function toggleLocale(): void {
    locale.value = locale.value === 'en' ? 'th' : 'en'
}

watch(locale, () => {
    dayjs.locale(locale.value)
    updateDateDisplay(stateDate.value)
})

watch(stateDate, (newVal) => {
    updateDateDisplay(newVal)
})

watch(() => props.modelValue, (newVal) => {
    if (newVal !== convertDateToString(stateDate.value)) {
        stateDate.value = convertStringToDate(newVal)
    }
})
</script>

<template>
    <div class="d-flex flex-column">
        <VLocaleProvider :locale="locale">
            <VMenu v-model="menu" :close-on-content-click="false" min-width="0">
                <template #activator="{ props: textFieldProps }">
                    <v-text-field
                        v-bind="textFieldProps"
                        v-model="textDisplay"
                        :label="label"
                        :disabled="disabled"
                        readonly
                        :clearable="props.clearable"
                        @click:clear="clearDate"
                    >
                        <template #append-inner>
                            <VTooltip v-if="locale_multiple" text="Change Locale" location="top">
                                <template #activator="{ props: tooltipProps }">
                                    <div
                                        class="ml-1 mr-1"
                                        style="cursor: pointer;"
                                        v-bind="tooltipProps"
                                        @click.stop="toggleLocale"
                                    >
                                        {{ locale === 'th' ? 'ไทย' : 'EN' }}
                                    </div>
                                </template>
                            </VTooltip>

                            <VIcon class="ml-1 mr-1">
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
