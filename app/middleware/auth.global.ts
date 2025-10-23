export default defineNuxtRouteMiddleware((to, from) => {
    const { token } = useAuthStore()

    // ถ้าไม่มี token และไม่ได้อยู่ที่หน้า login
    if (!token && to.path !== '/login') {
        return navigateTo('/login')
    }

    // ถ้ามี token แล้วพยายามเข้าหน้า login ให้ redirect ไปหน้าแรก
    if (token && to.path === '/login') {
        return navigateTo('/')
    }
})
