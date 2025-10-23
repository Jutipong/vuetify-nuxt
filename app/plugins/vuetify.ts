import type { IconProps, IconSet } from 'vuetify'
import { icons } from '@iconify-json/mdi'
import { addCollection, Icon } from '@iconify/vue'
import { h } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi'
import { en, th } from 'vuetify/locale'

import defaultComponents from '~/utils/config/vuetify/default-components'
import { darkTheme } from '~/utils/config/vuetify/theme-dark'
import { lightTheme } from '~/utils/config/vuetify/theme-light'
import { variables } from '~/utils/config/vuetify/variables'

import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
    addCollection(icons)

    const iconifyMdi: IconSet = {
        component: (props: IconProps) => {
            return h(
                'i',
                {},
                [
                    h(Icon, {
                        icon: typeof props.icon === 'string'
                            ? props.icon.replace('mdi-', 'mdi:')
                            : (props.icon as { name: string })?.name?.replace('mdi-', 'mdi:') || '',
                        disabled: props.disabled,
                    }),
                ],
            )
        },
    }

    const vuetify = createVuetify({
        ssr: true,
        locale: {
            locale: 'en',
            messages: { th, en },
        },
        date: {
            locale: {
                current: 'en-GB',
                en: 'en-GB',
                th: 'th-TH',
            },
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
            defaultSet: 'iconifyMdi',
            aliases,
            sets: {
                iconifyMdi,
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
