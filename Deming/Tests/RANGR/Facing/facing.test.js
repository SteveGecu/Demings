const facingApis = require('./facingApis')
const storeApis = require('../Store/storeApis')
const shelfApis = require('../Shelf/shelfApis')
const locationApis = require('../Location/locationApis')
const areaApis = require('../Area/areaApis')
const CostumerApi = require('./../Costumer/CostumerApis')

const fake = require('faker')

const areaName = 'autoArea'
const depthSize = 2
const emptyDistanceSize = 3.5
const locationDescription = 'autoDescription'
const locationLabel = 'autoLabel'
const customerId = 777
const customerName = 'Space INC'
const storeId = 777
let locationId
let shelfSizeId
let areaId
let facingId
let section = 1
let shelf = 2
let position = 3

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Facing Tests', () => {

    beforeAll(async () => {
        const areaResponse = await areaApis.createArea(areaName)
        areaId = areaResponse.body.areaId

        const storeResponse = await storeApis.createStore(storeId, customerId)

        const locationResponse = await locationApis.createLocation(locationDescription, locationLabel, areaId)
        locationId = locationResponse.body.locationId

        const shelfResponse = await shelfApis.createShelf(depthSize, emptyDistanceSize)
        shelfSizeId = shelfResponse.body.shelfSizeId


    })

    it('should create Facing for given area', async () => {
        const response = await facingApis.createFacing(section, shelf, position, storeId, locationId, shelfSizeId)
        facingId = response.body.facingId

        expect(response.status).toBe(201)
        expect(response.body.section).toEqual(section)
        expect(response.body.shelf).toEqual(shelf)
        expect(response.body.position).toEqual(position)
        expect(response.body.store.storeId).toEqual(storeId)
        expect(response.body.location.locationId).toEqual(locationId)
        expect(response.body.shelfSize.shelfSizeId).toEqual(shelfSizeId)

    });

    it('should return all Facings', async () => {
        const response = await facingApis.getFacings()

        expect(response.status).toBe(200)
    });

    it('should return Facing with given Facing id', async () => {
        const response = await facingApis.getFacing(facingId)

        expect(response.status).toBe(200)
    });

    it('should update Facing with given Facing id', async () => {
        const response = await facingApis.updateFacing(facingId)

        expect(response.status).toBe(200)
    });

    it('should delete Facing with given id', async () => {
        const response = await facingApis.deleteFacing(facingId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

    afterAll(async () => {
        await areaApis.deleteArea(areaId)
        await storeApis.deleteStore(storeId)
        await locationApis.deleteLocation(locationId)
        await areaApis.deleteArea(areaId)
    })

})