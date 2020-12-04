export function zip<K, V>(map: Map<K, V>): unknown[] {
    const zipped = []
    for (const [k, v] of map) {
        zipped.push([k, v])
    }
    return zipped
}

export function getObjectType(obj: unknown): string {
    const type = typeof obj
    if ("object" !== type) {
        return type
    }

    if (obj instanceof Set) {
        return "set"
    }
    if (obj instanceof Map) {
        return "map"
    }
    return type
}

export function reconstruct(obj: string): unknown {
    const parsed = JSON.parse(obj)
    switch (parsed.type) {
        case "set":
            return new Set(parsed.keyvals)
        case "map": {
            const map = new Map()
            for (const [k, v] of parsed.keyvals) {
                map.set(k, v)
            }
            return map
        }
        default:
            return parsed.object
    }
}