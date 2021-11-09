const ProvisionApi = require('./deviceProvisionApis')
const StoreApi = require('../Store/storeApis')
const CostumerApi = require('./../Costumer/CostumerApis')
const LocationApis = require('./../Location/locationApis')
const FacingApis = require('./../Facing/facingApis')
const AreaApis = require('./../Area/areaApis')
const ShelfApis = require('./../Shelf/shelfApis')
const DeviceApi = require('./../Device/deviceApis')
const customerId = 787
const customerName = 'testAutomationCostumerForStore'
const storeId = 878
let dsn = 999
let facingId
let locationId
let shelfSizeId
let areaId
let section = 1
let shelf = 2
let position = 3
let provisionId
let deviceId
let areaName = 'someArea'
let locationDescription = 'somePlace'
const locationLabel = 'autoLabel'
const depthSize = 2
const emptyDistanceSize = 3.5

describe('RANGR', () => {

    beforeAll(async () => {
        await CostumerApi.createCostumer(customerId, customerName)
        await StoreApi.createStore(storeId, customerId)

        const deviceResponse = await DeviceApi.createDevice(dsn)
        deviceId = deviceResponse.body.deviceId

        const areaResponse = await AreaApis.createArea(areaName)
        areaId = areaResponse.body.areaId

        const locationResponse = await LocationApis.createLocation(locationDescription, locationLabel, areaId)
        locationId = locationResponse.body.locationId

        const shelfResponse = await ShelfApis.createShelf(depthSize, emptyDistanceSize)
        shelfSizeId = shelfResponse.body.shelfSizeId

        const response = await FacingApis.createFacing(section, shelf, position, storeId, locationId, shelfSizeId)
        facingId = response.body.facingId

    })

    it('should create device provision', async () => {
        const response = await ProvisionApi.createProvision(storeId, dsn, facingId)
        provisionId = response.body.deviceProvisionId

        expect(response.status).toBe(201)
        expect(response.body.device.deviceSerialNumber).toEqual(dsn)
    });

    it('should return all provisions', async () => {
        const response = await ProvisionApi.getProvisions()

        expect(response.status).toBe(200)
    });

    it('should delete provision with given id', async () => {
        const response = await ProvisionApi.deleteProvision(provisionId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

    afterAll(async () => {
        await CostumerApi.deleteCustomer(customerId)
        await StoreApi.deleteStore(storeId)
        await LocationApis.deleteLocation(locationId)
        await ShelfApis.deleteShelf(shelfSizeId)
        await AreaApis.deleteArea(areaId)
        await DeviceApi.deleteDevice(deviceId)
    })
})