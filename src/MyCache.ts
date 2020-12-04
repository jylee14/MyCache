import { reconstruct, zip, getObjectType } from './helpers'

export interface CacheResult {
    success: boolean;
    val?: unknown
}

export class MyCache {
    private store: Map<string, string>; // backing store mapping key name -> JSON.stringify(value)

    constructor() {
        this.store = new Map()
    }

    public get size(): number {
        return this.store.size
    }

    /**
     * Retrieve the value from the cache that was stored with key
     * @param key - Key used to store the object in the cache with
     * @returns Returns { success: bool, value: any | null } if key exists in the cache
     */
    get(key: string): CacheResult {
        if (!(this.store.has(key))) {
            return {
                success: false,
                val: null
            }
        }

        const val = reconstruct(this.store.get(key))
        return {
            success: true,
            val
        }
    }

    /**
     * Stores the value in the cache and sets key to access the new item
     * 
     * @param key - Key used to store the object in the cache with
     * @param val - Value to be stored in the cache.
     * @param update - Will update the value if the key already exists
     * 
     * @returns Returns { success: bool, value: any | null } added is true IF the key was NEWLY added 
     * to the cache. false if the key exists and the value was updated. 
     */
    add(key: string, val: unknown, update = false): CacheResult {
        if (!update && this.store.has(key)) {
            return {
                success: false,
                val: null
            }
        }

        const type = getObjectType(val) // type of the complex obj (set/map)
        let keyvals: unknown[]
        if ('set' === type) {
            keyvals = Array.from((val as Set<unknown>).keys())
        } else if ('map' === type) {
            keyvals = zip(val as Map<unknown, unknown>)
        }

        const obj = {
            object: val,
            type,
            keyvals
        }

        this.store.set(key, JSON.stringify(obj))
        return {
            success: true,
            val
        }
    }

    remove(key: string): CacheResult {
        if (!(this.store.has(key))) {
            return {
                success: false,
                val: null
            }
        }

        this.store.delete(key)
        return {
            success: true,
            val: null
        }
    }
}