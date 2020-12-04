/**
 * Used to maintain some data of objects to be stored in the cache
 * 
 * object: the object passed in to be stored in cache (number | string | boolean | array | object literal)
 * type: used to reconstruct a complex object (set | map)
 * keyvals: values that were stored inside (set | map)
 */
export interface ObjectData {
    object: unknown;
    type: string;
    keyvals: unknown[];
}

/**
 * Zip K-V pair of the map into an array of arrays.
 * Only works on SIMPLE map types (simple obj -> simple obj)
 * @param map Map to zip key-val of
 */
export function zip<K, V>(map: Map<K, V>): unknown[] {
    const zipped = []
    const keys = Array.from(map.keys())
    for(const k of keys) {
        const v = map.get(k)
        zipped.push([k, v])
    }
    return zipped
}

/**
 * Returns the object type of the object.
 * Used to specify whether the object is simple object, set, or map
 * @param obj object the find type of
 */
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

/**
 * Reconstruct the object from data available in obj
 * @param obj - JSON-stringify'ed representation of the object that was stored into the cache
 */
export function reconstruct(obj: string): unknown {
    const parsed: ObjectData = JSON.parse(obj)
    switch (parsed.type) {
        case "set":
            return new Set(parsed.keyvals)
        case "map": {
            const map = new Map()
            for(const [k, v] of parsed.keyvals) {
                map.set(k, v)
            }
            return map
        }
        default:
            return parsed.object
    }
}