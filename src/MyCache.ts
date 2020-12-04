import { reconstruct, zip, getObjectType, ObjectData } from './helpers'

/**
 * Stores the result of calls to MyCache. 
 * success: true if operation was successful
 * val?: the values that were stored into the cache. will NOT update if original object changes.
 */
export interface CacheResult {
    success: boolean;
    val?: unknown;
}

export class MyCache {
    private store: Map<string, string>; // backing store mapping key name -> string repr of object

    constructor() {
        this.store = new Map()
    }

    public get size(): number {
        return this.store.size
    }

    /**
     * Retrieve the value from the cache that was stored with key
     * @param key - Key used to store the object in the cache with
     * @returns Returns { success: bool, val?: unknwon } if key exists in the cache
     */
    get(key: string): CacheResult {
        if (!(this.store.has(key))) {
            return {
                success: false,
                val: null
            }
        }

        return {
            success: true,
            val: reconstruct(this.store.get(key))
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

        const type = getObjectType(val) // type of the complex obj ("set" | "map")
        let keyvals: unknown[]
        if ('set' === type) {
            keyvals = Array.from((val as Set<unknown>).keys())
        } else if ('map' === type) {
            keyvals = zip(val as Map<unknown, unknown>)
        }

        const obj: ObjectData = {
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

    /**
     * Attempt to remove the key and its associated value from the cache 
     * @param key Key to remove from the cache
     * @returns { success: bool, val: unknown } success is true if object exists AND is removed from the cache. 
     *  val is the object that was removed from the cache
     */
    remove(key: string): CacheResult {
        if (!(this.store.has(key))) {
            return {
                success: false,
                val: null
            }
        }

        const val = reconstruct(this.store.get(key))
        this.store.delete(key)
        return {
            success: true,
            val
        }
    }
}