const ProductProvisionApis = require('./productProvisionApis')
const CostumerApi = require('./../Costumer/CostumerApis')
const StoreApi = require('../Store/storeApis')
const FacingApis = require('./../Facing/facingApis')
const LocationApis = require('./../Location/locationApis')
const AreaApis = require('./../Area/areaApis')
const ShelfApis = require('./../Shelf/shelfApis')
const ProductApi = require('./../Product/productApis')
const CategoryApi = require('./../Category/categoryApi')
const customerId = 676
const customerName = 'testAutomationCostumer'
const storeId = 666
const areaName = 'someArea'
const locationDescription = 'somePlace'
const locationLabel = 'autoLabel'
const categoryName = 'someCategory'
const depthSize = 2
const emptyDistanceSize = 3.5
const productName = 'someName'
let areaId
let productId
let categoryId
let productProvisionId
let facingId
let locationId
let shelfSizeId
let section = 1
let shelf = 2
let position = 3

describe('RANGR Product Provision Tests', () => {

    beforeAll(async () => {
        await CostumerApi.createCostumer(customerId, customerName)
        await StoreApi.createStore(storeId, customerId)
        areaId = await (await AreaApis.createArea(areaName)).body.areaId
        locationId = await (await LocationApis.createLocation(
            locationDescription,
            locationLabel,
            areaId)).body.locationId
        shelfSizeId = await (await ShelfApis.createShelf(depthSize, emptyDistanceSize)).body.shelfSizeId
        facingId = await (await FacingApis.createFacing(
            section,
            shelf,
            position,
            storeId,
            locationId,
            shelfSizeId)).body.facingId
        categoryId = (await CategoryApi.createCategory(categoryName)).body.categoryId
        productId = await (await ProductApi.createProduct(productName, categoryId)).body.productId
    })

    it('should create product provision', async () => {
        const response = await ProductProvisionApis.createProductProvision(
            productId,
            facingId)
        productProvisionId = response.body.productProvisionId

        expect(response.status).toBe(201)
    });

    it('should not create provision without product Id', async () => {
        const response = await ProductProvisionApis.createProductProvision(
            '',
            facingId)

        expect(response.status).toBe(404)
    });

    it('should not create provision without facing Id', async () => {
        const response = await ProductProvisionApis.createProductProvision(
            productId,
            '')

        expect(response.status).toBe(500)
    });

    it('should return all products provisions', async () => {
        const response = await ProductProvisionApis.getProductProvisions()

        expect(response.status).toBe(200)
    });

    it('should delete product provision with given id', async () => {
        const response = await ProductProvisionApis.deleteProductProvosion(productProvisionId)
        expect(response.status).toBe(200)
    });

    afterAll(async () => {
        await CostumerApi.deleteCustomer(customerId)
        await StoreApi.deleteStore(storeId)
        await LocationApis.deleteLocation(locationId)
        await AreaApis.deleteArea(areaId)
        await FacingApis.deleteFacing(facingId)
        await CategoryApi.deleteCategory(categoryId)
        await ProductApi.deleteProduct(productId)
    })

})