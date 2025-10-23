interface CacheItem {
    data: any
    timestamp: number
    ttl: number
}

interface CacheOptions {
    ttl?: TimeConfig
    prefix?: string
}

class CacheManager {
    private storage: Storage | null
    private prefix: string

    constructor(storage?: Storage, prefix: string = 'api-cache:') {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined' && storage === undefined) {
            this.storage = sessionStorage
        } else {
            this.storage = storage || null
        }
        this.prefix = prefix
    }

    private getKey(key: string): string {
        return `${this.prefix}${key}`
    }

    private isExpired(item: CacheItem): boolean {
        return Date.now() > item.timestamp + item.ttl
    }

    set(key: string, data: any, options: CacheOptions = {}): void {
        if (!this.storage) return

        const ttl = options.ttl ? _dateTime.TimeConfig(options.ttl) : _dateTime.TimeConfig('5min')

        const cacheItem: CacheItem = {
            data,
            timestamp: Date.now(),
            ttl,
        }

        try {
            this.storage.setItem(this.getKey(key), JSON.stringify(cacheItem))
        }
        catch (error) {
            console.warn('Cache storage failed:', error)
        }
    }

    get(key: string): any | null {
        if (!this.storage) return null

        try {
            const cached = this.storage.getItem(this.getKey(key))

            if (!cached) {
                return null
            }

            const item: CacheItem = JSON.parse(cached)

            if (this.isExpired(item)) {
                this.delete(key)
                return null
            }

            return item.data
        }
        catch (error) {
            console.warn('Cache retrieval failed:', error)
            return null
        }
    }

    delete(key: string): void {
        if (!this.storage) return

        try {
            this.storage.removeItem(this.getKey(key))
        }
        catch (error) {
            console.warn('Cache deletion failed:', error)
        }
    }

    clear(): void {
        if (!this.storage) return

        try {
            const keys = Object.keys(this.storage)
            keys.forEach((key) => {
                if (key.startsWith(this.prefix)) {
                    this.storage!.removeItem(key)
                }
            })
        }
        catch (error) {
            console.warn('Cache clear failed:', error)
        }
    }

    has(key: string): boolean {
        const cached = this.get(key)
        return cached !== null
    }

    size(): number {
        if (!this.storage) return 0

        try {
            const keys = Object.keys(this.storage)
            return keys.filter(key => key.startsWith(this.prefix)).length
        }
        catch (error) {
            console.warn('Cache size calculation failed:', error)
            return 0
        }
    }
}

// สร้าง instance เริ่มต้น
const cache = new CacheManager()

// Helper function สำหรับสร้าง cache key จาก request config
function createCacheKey(url: string, method: string, params?: any, data?: any): string {
    let key = `${url}_${method.toLowerCase()}`

    if (params) {
        const searchParams = new URLSearchParams(params).toString()
        key += `?${searchParams}`
    }

    if (data && method.toLowerCase() === 'post') {
        key += `_${JSON.stringify(data)}`
    }

    return key
}

// Cache decorator สำหรับ API calls
function withCache<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    keyGenerator: (...args: Parameters<T>) => string,
    options: CacheOptions = {},
): T {
    return (async (...args: Parameters<T>) => {
        const cacheKey = keyGenerator(...args)

        // ลองดึงจาก cache ก่อน
        const cached = cache.get(cacheKey)
        if (cached) {
            return cached
        }

        // ถ้าไม่มีใน cache ให้เรียก function จริง
        const result = await fn(...args)

        // เก็บผลลัพธ์ลง cache
        cache.set(cacheKey, result, options)

        return result
    }) as T
}

export type { CacheItem, CacheOptions }
export { cache, CacheManager, createCacheKey, withCache }
