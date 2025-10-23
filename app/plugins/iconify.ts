import { icons } from '@iconify-json/mdi'
import { addCollection } from '@iconify/vue'

export default defineNuxtPlugin(() => {
    addCollection(icons)
})
