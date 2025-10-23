import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const toastConfig: PluginOptions = {
        transition: 'Vue-Toastification__bounce',
        timeout: 5000,
        maxToasts: 9,
        newestOnTop: true,
    }

    nuxtApp.vueApp.use(Toast, toastConfig)
})
