import { z } from 'zod'

function useZod<T1 extends z.ZodType<any, any>, T2>(schema: T1, state: T2) {
    type FormData = z.infer<T1>

    const zErrors = ref<T2>({} as T2)
    const hasValidated = ref(false)

    function zValidate(): boolean {
        hasValidated.value = true

        const result = schema.safeParse(state)

        if (result.success) {
            zErrors.value = {}
            return true
        }

        const formattedErrors: any = {}

        // result.error.errors.forEach((error: any) => {
        //     const fieldName = error.path[0] as keyof FormData
        //     formattedErrors[fieldName] = error.message
        // })

        result.error.issues.forEach((error: any) => {
            let target = formattedErrors
            error.path.forEach((key: string, index: number) => {
                if (index === error.path.length - 1) {
                    (target as any)[key] = error.message
                }
                else {
                    target[key] = target[key] || {}
                    target = target[key]
                }
            })
        })

        zErrors.value = formattedErrors as Partial<T2>
        return false
    }

    function zReset() {
        Object.assign(state as object, {} as FormData)
        zErrors.value = {}
        hasValidated.value = false
    }

    watch(() => state, () => {
        if (!hasValidated.value)
            return
        zValidate()
    }, { deep: true })

    return { zErrors, zValidate, zReset }
}

function requiredString(message: string, zodType: z.ZodType<any, any>[] = []) {
    return z.union([z.string(), z.null(), z.undefined(), ...zodType]).refine((val: any) => !!val, { message })
}
function requiredNumber(message: string, zodType: z.ZodType<any, any>[] = []) {
    return z.union([z.number(), z.null(), z.undefined(), ...zodType]).refine((val: any) => !!val, { message })
}

export { requiredNumber, requiredString, useZod }
