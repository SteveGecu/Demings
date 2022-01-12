const AreaApi = require('./areaApis')
const areaName = 'rangrTestArea'
const newAreaName = 'newRangrTestArea'
let areaId


jest.setTimeout(60000)
jest.retryTimes(3)


describe('RANGR Area Tests', () => {
    it('should create area', async () => {
        const response = await AreaApi.createArea(areaName)
        areaId = response.body.areaId

        expect(response.status).toBe(201)
        expect(response.body.name).toEqual(areaName)
        expect(response.body.areaId).toHaveProperty
    });

    it('should return all areas', async () => {
        const response = await AreaApi.getAreas()

        expect(response.status).toBe(200)
    });

    it('should return area with given areaId', async () => {
        const response = await AreaApi.getArea(areaId)

        expect(response.status).toBe(200)
        expect(response.body.name).toEqual(areaName)
    });

    it('should update area with given arean Id', async () => {
        const response = await AreaApi.updateArea(areaId, newAreaName)

        expect(response.status).toBe(200)
        expect(response.body.areaId).toEqual(areaId)
        expect(response.body.name).toEqual(newAreaName)
    });

    it('should delete store with given id', async () => {
        const response = await AreaApi.deleteArea(areaId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });
})