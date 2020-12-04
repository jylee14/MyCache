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
        
        describe('Retrieving from the Cache', () => {
            test('Empty Cache should return nothing', () => {
                const nonExistant = cache.get('invalidName')
                expect(nonExistant.success).toBe(false)
            })

            test('Cache should return the element that is inserted', () => {
                const str = "Hello Cache!"
                
                cache.add("string", str)
                expect(cache.size).toBe(1)
                const fromCache = cache.get("string")
                expect(fromCache.success).toEqual(true)
                expect(fromCache.value).toStrictEqual(str)
            })
        })
    })
})
