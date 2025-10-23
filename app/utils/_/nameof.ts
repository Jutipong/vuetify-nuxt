export function NameOfField<T>(): { [K in keyof Required<T>]: K } {
    return new Proxy({}, {
        get: (_, prop: string | symbol) => String(prop),
    }) as { [K in keyof Required<T>]: K }
}
