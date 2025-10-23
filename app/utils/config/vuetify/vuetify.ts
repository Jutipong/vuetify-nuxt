import type { IconProps, IconSet, VuetifyOptions } from 'vuetify'
import { icons } from '@iconify-json/mdi'
// ใช้ Iconify JSON แทน API
import { addCollection, Icon } from '@iconify/vue'
import { h } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi'
// import * as labsComponents from 'vuetify/labs/components'
import { en, th } from 'vuetify/locale'
import defaultComponents from './default-components'

import { darkTheme } from './theme-dark'
import { lightTheme } from './theme-light'
import { variables } from './variables'
import 'vuetify/styles'

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

export default createVuetify({
    ssr: false,
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
    // components: {
    //     // VNumberInput: labsComponents.VNumberInput,
    //     VDateInput: labsComponents.VDateInput,
    // },
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
} as VuetifyOptions)
