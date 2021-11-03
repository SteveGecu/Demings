const StoreApi = require('./storeApis')
const CostumerApi = require('./../Costumer/CostumerApis')
const storeId = 555
const customerId = 666
const customerName = 'testAutomationCostumerForStore'

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Store Tests', () => {

    beforeAll(async () => {
        const response = await CostumerApi.createCostumer(customerId, customerName)
    })

    it('should create store', async () => {
        const response = await StoreApi.createStore(storeId, customerId)

        expect(response.status).toBe(201)
        expect(response.body.storeId).toEqual(storeId)
        expect(response.body.customer.customerId).toEqual(customerId)
        expect(response.body.customer.name).toEqual(customerName)
        expect(response.body.description).toEqual('Spacee Store')
    });

    it('should return all stores', async () => {
        const response = await StoreApi.getStores()

        expect(response.status).toBe(200)
    });

    it('should return store with given id', async () => {
        const response = await StoreApi.getStore(storeId)

        expect(response.status).toBe(200)
    });

    it('should update store with given id', async () => {
        const response = await StoreApi.updateStore(storeId)

        expect(response.status).toBe(200)
        expect(response.body.storeId).toEqual(storeId)
        expect(response.body.description).toEqual('Spacee Store 2')

    });

    it('should delete store with given id', async () => {
        const response = await StoreApi.deleteStore(storeId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

    afterAll(async () => {
        const response = await CostumerApi.deleteCustomer(customerId)
    })

})