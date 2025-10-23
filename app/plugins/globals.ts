// // Import global utilities
// import api from '~/utils/api'
// import { useConfirm } from '~/utils/confirm'
// import { _alert } from '~/utils/alert'
// import { _notify } from '~/utils/notify'

// export default defineNuxtPlugin(() => {
//     const confirm = useConfirm()
    
//     return {
//         provide: {
//             api,
//             confirm,
//             alert: _alert,
//             notify: _notify,
//         },
//     }
// })

// // Declare global variables for template usage
// declare module '#app' {
//     interface NuxtApp {
//         $api: typeof api
//         $confirm: ReturnType<typeof useConfirm>
//         $alert: typeof _alert
//         $notify: typeof _notify
//     }
// }

// declare module 'vue' {
//     interface ComponentCustomProperties {
//         $api: typeof api
//         $confirm: ReturnType<typeof useConfirm>
//         $alert: typeof _alert
//         $notify: typeof _notify
//     }
// }

// // Make globally available
// declare global {
//     const api: typeof import('~/utils/api').default
//     const _confirm: ReturnType<typeof useConfirm>
//     const _alert: typeof import('~/utils/alert')._alert
//     const _notify: typeof import('~/utils/notify')._notify
// }
