import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

localstorage_slim.config.storage = sessionStorage
localstorage_slim.config.encrypt = true

const secureStorage = {
    getItem(key: string): string | null {
        return localstorage_slim.get(key)
    },
    setItem(key: string, value: string): void {
        localstorage_slim.set(key, value)
    },
    removeItem(key: string): void {
        localstorage_slim.remove(key)
    },
}

const piniaConfig = createPinia()
piniaConfig.use(createPersistedState({
    storage: secureStorage,
}))

export { piniaConfig }
