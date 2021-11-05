const shelfApis = require('./shelfApis')
const depthSize = 2
const emptyDistanceSize = 3.5
const newDepthSize = 4
const newEmptyDistanceSize = 7
let shelfId

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Shelf Tests', () => {

    it('should create Shelf', async () => {

        const response = await shelfApis.createShelf(depthSize, emptyDistanceSize)
        shelfId = response.body.shelfSizeId
        console.log(shelfId);

        expect(response.status).toBe(201)
        expect(response.body.depth).toEqual(depthSize)
        expect(response.body.emptyDistance).toEqual(emptyDistanceSize)
        expect(response.body.shelfSizeId).toHaveProperty
    });

    it('should return all Shelfs', async () => {
        const response = await shelfApis.getShelfs()

        expect(response.status).toBe(200)
    });

    it('should return Shelf for given Shelf id', async () => {
        const response = await shelfApis.getShelf(shelfId)

        expect(response.status).toBe(200)
    });

    it('should update Shelf with given Shelf id', async () => {
        const response = await shelfApis.updateShelf(shelfId, newDepthSize, newEmptyDistanceSize)
        console.log(response);

        expect(response.status).toBe(200)
        expect(response.body.shelfSizeId).toEqual(shelfId)
        expect(response.body.depth).toEqual(newDepthSize)
        expect(response.body.emptyDistance).toEqual(newEmptyDistanceSize)

    });

    it('should delete Shelf with given Shelf id', async () => {
        const response = await shelfApis.deleteShelf(shelfId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

})