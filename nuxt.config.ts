// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    compatibilityDate: '2025-07-15',
    
    modules: [
        'vuetify-nuxt-module',
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@vueuse/nuxt',
    ],

    css: [
        '~/assets/sass/style.scss',
        '~/assets/css/main.css',
        'vuetify/styles',
        'vue3-perfect-scrollbar/style.css',
        'vue-toastification/dist/index.css',
    ],

    vuetify: {
        moduleOptions: {
            ssrClientHints: {
                reloadOnFirstRequest: false,
            },
        },
    },

    imports: {
        dirs: ['stores', 'utils', 'types'],
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],

    runtimeConfig: {
        public: {
            appName: process.env.NUXT_PUBLIC_APP_NAME || 'Vuetify Nuxt App',
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com',
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/sass/variables.scss" as *;',
                },
            },
        },
    },

    typescript: {
        strict: false,
        shim: false,
    },
})