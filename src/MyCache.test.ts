import { MyCache } from './MyCache'

describe('MyCache Tests', () => {
    test('Initializing Caches', () => {
        const cache = new MyCache()
        expect(cache).toBeDefined()
        expect(cache.size).toBe(0)
    })

    describe('functionalities of the cache', () => {
        let cache: MyCache
        beforeEach(() => {
            cache = new MyCache()
        })
        
        describe('Emtpy cache', () => {
            test('should return nothing', () => {
                const nonExistant = cache.get('invalidName')
                expect(nonExistant.success).toBe(false)
            })


            test('adding new item', () => {
                const item = 'Hello Cache!'
                const beforeSize = cache.size
                const { success, val } = cache.add('item', item)
                expect(success).toBe(true)
                expect(val).toEqual(item)
                expect(cache.size).toBe(beforeSize + 1)
            })
        })

        describe('Filled cache', () => {
            const k = 'item'
            const v = 'Hello Cache!'

            beforeEach(() => {
                cache = new MyCache()
                cache.add(k, v)
            })

            test('getting an existing item', () => {
                const { success, val } = cache.get(k)
                expect(success).toBe(true)
                expect(val).toEqual(v)
            })


            test('should fail if key is duplicate and not updating', () => {
                const newVal = 'Hello duplicate'
                
                const { success, val } = cache.add(k, newVal)
                expect(cache.size).toBe(cache.size)
                expect(success).toEqual(false)
                expect(val).toBe(null)
            })

            test('should update if duplicate key and set to update', () => {
                const newVal = 'Hello duplicate'
                
                const { success, val } = cache.add(k, newVal, true)
                expect(cache.size).toBe(cache.size)
                expect(success).toEqual(true)
                expect(val).toBe(newVal)          
            })
        })
    })
})
