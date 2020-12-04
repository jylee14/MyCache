export interface CacheResult {
    success: boolean;
    val: any | null
}

export class MyCache {
    private store: Map<string, any>; // backing store mapping key name -> value 
    
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
        if(!(this.store.has(key))) { 
            return {
                success: false,
                val: null
            }
        }
        return { 
            success: true,
            val: this.store.get(key)
        }
    }

    /**
     * 
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
    add(key: string, val: any, update: boolean = false): CacheResult {
        if(!update && this.store.has(key)) {
            return {
                success: false,
                val: null
            }
        }

        this.store.set(key, val)
        return {
            success: true,
            val
        }
    }
}