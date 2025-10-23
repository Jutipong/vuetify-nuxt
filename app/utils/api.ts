import type { AxiosRequestConfig, AxiosRequestTransformer, AxiosResponse } from 'axios'
import axios from 'axios'
import { cache, createCacheKey } from './cache'

interface ApiOptions {
    timeout?: TimeConfig
    baseURL?: string
    isLoading?: boolean
    cache?: boolean
    cacheTimeout?: TimeConfig
    params?: any
    data?: any
}

const HTTP_STATUS_MESSAGES: Record<number, string> = {
    401: 'ไม่มีสิทธิ์ในการเข้าถึง (401)',
    403: 'การเข้าถึงถูกปฏิเสธ (403)',
    404: 'ไม่พบบริการ (404)',
    408: 'คำขอหมดเวลา (408)',
    500: 'ข้อผิดพลาดของเซิร์ฟเวอร์ (500)',
    501: 'ไม่ได้ใช้บริการ (501)',
    502: 'ข้อผิดพลาดของเครือข่าย (502)',
    503: 'ไม่สามารถให้บริการได้ (503)',
    504: 'เครือข่ายหมดเวลา (504)',
    505: 'ไม่รองรับเวอร์ชัน HTTP (505)',
}

const CACHEABLE_METHODS = ['get', 'post']
const ERROR_STATUS_CODES = [400, 401, 403, 404, 500]
const DEFAULT_TIMEOUT = '30sec'
const DEFAULT_CACHE_TTL = '5min'

function transformDateToISO(data: any): any {
    if (data instanceof Date) {
        const dateObj = new Date(data)
        dateObj.setHours(dateObj.getHours() + 7)
        return dateObj.toISOString()
    }

    if (Array.isArray(data)) {
        return data.map(transformDateToISO)
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, transformDateToISO(value)]),
        )
    }

    return data
}

import type { AxiosInstance } from 'axios'

let axiosInstance: AxiosInstance | null = null

function getAxiosInstance(): AxiosInstance {
    if (!axiosInstance) {
        const config = useRuntimeConfig()
        axiosInstance = axios.create({
            baseURL: config.public.apiBaseUrl,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            transformRequest: [transformDateToISO, ...(axios.defaults.transformRequest as AxiosRequestTransformer[])],
        })

        // Setup interceptors
        axiosInstance.interceptors.request.use((config: any) => {
            const shouldShowLoading = config?.isLoading ?? true

            if (shouldShowLoading) {
                const { setLoading } = useAppStore()
                setLoading()
            }

            // Add authorization token dynamically
            const { token } = useAuthStore()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        }, handleApiError)

        axiosInstance.interceptors.response.use(({ config, data }: any): AxiosResponse<any, any> => {
            const shouldHideLoading = config?.isLoading ?? true

            if (shouldHideLoading) {
                const { unLoading } = useAppStore()
                unLoading()
            }

            return data
        }, handleApiError)
    }

    return axiosInstance
}

function isCacheableRequest(method: string, status?: number): boolean {
    const isMethodCacheable = CACHEABLE_METHODS.includes(method.toLowerCase())
    const isStatusValid = !status || !ERROR_STATUS_CODES.includes(status)

    return isMethodCacheable && isStatusValid
}

async function fetchWithCache<T>(url: string, method: string, requestFn: () => Promise<T>, config?: ApiOptions): Promise<T> {
    const shouldUseCache = config?.cache && isCacheableRequest(method)

    if (!shouldUseCache) {
        return await requestFn()
    }

    const cacheKey = createCacheKey(url, method, config.params, config.data)

    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return cachedData
    }

    const result = await requestFn()

    cache.set(cacheKey, result, {
        ttl: config.cacheTimeout || DEFAULT_CACHE_TTL,
    })

    return result
}

function handleApiError(err: any) {
    const { resetLoading } = useAppStore()

    let errorCode: any = ''
    let errorMessage: string = ''

    if (err.code === 'ECONNABORTED') {
        errorCode = err.code
        errorMessage = err.message
    }
    else {
        const response = err?.response
        errorCode = response?.status ?? 500
        errorMessage = HTTP_STATUS_MESSAGES[errorCode] || 'เกิดข้อผิดพลาด'
    }

    _alert.Err(`status code: ${errorCode}`, errorMessage)
    resetLoading()

    if (errorCode === 401) {
        const router = useRouter()
        router.push('/login')
    }

    return Promise.reject(err)
}

function createApiConfig(options?: ApiOptions): AxiosRequestConfig {
    const defaultConfig = {
        timeout: _dateTime.TimeConfig(DEFAULT_TIMEOUT),
        cache: false,
    }

    if (!options) {
        return defaultConfig as AxiosRequestConfig
    }

    return {
        ...options,
        cache: options.cache ?? false,
        timeout: options?.timeout
            ? _dateTime.TimeConfig(options.timeout)
            : _dateTime.TimeConfig(DEFAULT_TIMEOUT),
    } as AxiosRequestConfig
}

const api = {
    Get: async <TResponse>(url: string, config?: ApiOptions) => {
        const instance = getAxiosInstance()
        return await fetchWithCache<TResponse>(
            url,
            'GET',
            () => instance.get<any, TResponse>(url, createApiConfig(config)),
            { ...config, params: config?.params },
        )
    },

    Post: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        const instance = getAxiosInstance()
        return await fetchWithCache<TResponse>(
            url,
            'POST',
            () => instance.post<any, TResponse>(url, data, createApiConfig(config)),
            { ...config, data },
        )
    },

    Put: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        const instance = getAxiosInstance()
        return await instance.put<any, TResponse>(url, data, createApiConfig(config))
    },

    Delete: async <TResponse>(url: string, config?: ApiOptions) => {
        const instance = getAxiosInstance()
        return await instance.delete<any, TResponse>(url, createApiConfig(config))
    },
}

export default api
