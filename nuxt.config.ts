// https://nuxt.com/docs/api/configuration/nuxt-config
import { lightTheme } from './app/utils/config/vuetify/theme-light'
import { darkTheme } from './app/utils/config/vuetify/theme-dark'
import { variables } from './app/utils/config/vuetify/variables'
import defaultComponents from './app/utils/config/vuetify/default-components'

export default defineNuxtConfig({
    devtools: { enabled: false },
    compatibilityDate: '2025-07-15',
    
    modules: [
        'vuetify-nuxt-module',
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@vueuse/nuxt',
    ],

    components: [
        {
            path: '~/components',
            pathPrefix: true,
        },
    ],

    css: [
        '~/assets/sass/style.scss',
        '~/assets/css/main.css',
        'vue3-perfect-scrollbar/style.css',
        'vue-toastification/dist/index.css',
    ],

    vuetify: {
        moduleOptions: {
            ssrClientHints: {
                reloadOnFirstRequest: false,
            },
        },
        vuetifyOptions: {
            locale: {
                locale: 'en',
            },
            defaults: defaultComponents,
            theme: {
                defaultTheme: 'light',
                themes: {
                    light: {
                        colors: lightTheme,
                        variables,
                    },
                    dark: {
                        colors: darkTheme,
                        variables,
                    },
                },
            },
            icons: {
                defaultSet: 'mdi',
            },
        },
    },

    imports: {
        dirs: ['stores', 'utils', 'types'],
    },

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