import { MyCache } from './MyCache'

describe('MyCache Tests', () => {
    test('Initializing Caches', () => {
        const cache = new MyCache()
        expect(cache).toBeDefined()
        expect(cache.size).toBe(0)
    })

    describe('functionalities of the cache', () => {
        let cache: MyCache
        let beforeSize: number
        beforeEach(() => {
            cache = new MyCache()
            beforeSize = cache.size
        })

        describe('Emtpy cache', () => {
            test('should return nothing', () => {
                const nonExistant = cache.get('invalidName')
                expect(nonExistant.success).toBe(false)
            })


            test('adding new simple item', () => {
                const item = 'Hello Cache!'
                const beforeSize = cache.size
                const { success, val } = cache.add('item', item)
                expect(success).toBe(true)
                expect(val).toEqual(item)
                expect(cache.size).toEqual(beforeSize + 1)
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

            test('should update if duplicate key and update set', () => {
                const newVal = 'Hello duplicate'

                const { success, val } = cache.add(k, newVal, true)
                expect(cache.size).toBe(cache.size)
                expect(success).toEqual(true)
                expect(val).toBe(newVal)
            })

            test('deleting a non-existant key', () => {
                const { success } = cache.remove('null')
                expect(success).toBe(false)
            })

            test('deleting a key that exists', () => {
                const { success } = cache.remove(k)
                expect(success).toBe(true)
            })
        })

        describe('Caching objects', () => {
            test('Javascript Object literals', () => {
                const complexObject = {
                    str: 'hello world',
                    num: 1234,
                    nested: {
                        str: 'nested'
                    }
                }

                const { success, val } = cache.add('object', complexObject)
                expect(success).toBe(true)
                expect(val).toStrictEqual(complexObject)
                expect(cache.size).toEqual(beforeSize + 1)

                const { success: getResult } = cache.get('object')
                expect(getResult).toBe(true)
                expect(val).toStrictEqual(complexObject)

                const { success: removeResult } = cache.remove('object')
                expect(removeResult).toBe(true)
            })

            test('Arrays', () => {
                const array = [1, 2, 3, 'a', 'b', 'c']

                const { success, val } = cache.add('array', array)
                expect(success).toBe(true)
                expect(val).toStrictEqual(array)
                expect(cache.size).toEqual(beforeSize + 1)

                const { success: getResult } = cache.get('array')
                expect(getResult).toBe(true)
                expect(val).toStrictEqual(array)

                const { success: removeResult } = cache.remove('array')
                expect(removeResult).toBe(true)
            })

            test('Set', () => {
                const set = new Set([1, 2, 3, 4, 5, 1, 3, 5, 7, 9, 10])

                const { success, val } = cache.add('set', set)
                expect(success).toBe(true)
                expect(val).toStrictEqual(set)
                expect(cache.size).toEqual(beforeSize + 1)

                const { success: getResult } = cache.get('set')
                expect(getResult).toBe(true)
                expect(val).toStrictEqual(set)

                const { success: removeResult } = cache.remove('set')
                expect(removeResult).toBe(true)
            })

            test('Map', () => {
                const map = new Map()
                for (let i = 0; i < 10; i++) {
                    map.set(i, Math.pow(i, 2))
                }

                const { success, val } = cache.add('map', map)
                expect(success).toBe(true)
                expect(val).toStrictEqual(map)
                expect(cache.size).toEqual(beforeSize + 1)

                const { success: getResult } = cache.get('map')
                expect(getResult).toBe(true)
                expect(val).toStrictEqual(map)

                const { success: removeResult } = cache.remove('map')
                expect(removeResult).toBe(true)
                const { success: getAfterRemove } = cache.get('map')
                expect(getAfterRemove).toBe(false)
            })
        })
    })
})
