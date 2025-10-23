export function _contains(text: string | string[], search: string): boolean {
    const regex = new RegExp(search, 'i') // ไม่สนใจตัวพิมพ์เล็ก-ใหญ่

    if (Array.isArray(text)) {
        return text.some(t => regex.test(t))
    }

    return regex.test(text)
}
