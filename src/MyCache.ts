export interface CacheResult {
    success: boolean;
    value: any | null
}

export class MyCache {
    private store: Map<string, any>; // backing store mapping key name -> value 
    
    constructor() {
        this.store = new Map()
    }

    public get size(): number {
        return this.store.size
    }

    get(key: string): CacheResult {
        if(!(this.store.has(key))) { 
            return {
                success: false,
                value: null
            }
        }
        return { 
            success: true,
            value: this.store.get(key)
        }
    }

    add(key: string, val: any) {
        this.store.set(key, val)
    }
}