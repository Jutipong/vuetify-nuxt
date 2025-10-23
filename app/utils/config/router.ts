import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes),
    scrollBehavior() { return { top: 0 } },
})

router.beforeEach((to: any, from: any, next: any) => {
    const { token, clearAuth } = useAuthStore()
    const app = useAppStore()

    app.isProgressLoading = true

    if (to.path === '/login') {
        clearAuth()
        return next()
    }

    if (!token) {
        clearAuth()
        return next({ path: '/login' })
    }

    next()
})

router.afterEach(() => {
    const app = useAppStore()
    app.isProgressLoading = false
})

export { router }
