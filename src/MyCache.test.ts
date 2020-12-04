import { MyCache } from './MyCache'

describe('MyCache Tests', () => {
    test('Initializing Caches', () => {
        const cache = new MyCache()
        expect(cache).toBeDefined()
    })
})
