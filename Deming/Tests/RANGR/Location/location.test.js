const lacationApis = require('./locationApis')
const areaApis = require('../Area/areaApis')
const areaName = 'autoArea'
const locationDescription = 'autoDescription'
const locationLabel = 'autoLabel'
let areaId
let locationId

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Location Tests', () => {

    beforeAll(async () => {
        const response = await areaApis.createArea(areaName)
        areaId = response.body.areaId
    })

    it('should create location for given area', async () => {

        const response = await lacationApis.createLocation(locationDescription, locationLabel, areaId)
        locationId = response.body.locationId

        expect(response.status).toBe(201)
        expect(response.body.description).toEqual(locationDescription)
        expect(response.body.label).toEqual(locationLabel)
        expect(response.body.area.areaId).toEqual(areaId)
        expect(response.body.area.name).toEqual(areaName)
        expect(response.body.locationId).toHaveProperty
    });

    it('should return all locations', async () => {
        const response = await lacationApis.getLocations()

        expect(response.status).toBe(200)
    });

    it('should return location with given location id', async () => {
        const response = await lacationApis.getLocation(locationId)

        expect(response.status).toBe(200)
    });

    it('should update location with given location id', async () => {
        const response = await lacationApis.updateLocation(locationId, areaId)

        expect(response.status).toBe(200)
        expect(response.body.locationId).toEqual(locationId)
        expect(response.body.description).toEqual('Updated Spacee Store')
        expect(response.body.label).toEqual('test label')
        expect(response.body.area.areaId).toEqual(areaId)
    });

    it('should delete Location with given id', async () => {
        const response = await lacationApis.deleteLocation(locationId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

    afterAll(async () => {
        await areaApis.deleteArea(areaName)
    })

})