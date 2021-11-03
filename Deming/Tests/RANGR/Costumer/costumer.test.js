const CostumerApi = require('./costumerApis')
const customerId = 555
const customerName = 'testAutomationCostumer'
const newcustomerName = 'newTestAutomationCostumer'

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Customer Tests', () => {

    it('should create customer', async () => {
        const response = await CostumerApi.createCostumer(customerId, customerName)

        expect(response.status).toBe(201)
        expect(response.body.customerId).toEqual(customerId)
        expect(response.body.name).toEqual(customerName)
    });

    it('should return all customers', async () => {
        const response = await CostumerApi.getCustomers()

        expect(response.status).toBe(200)
    });

    it('should return customer with given id', async () => {
        const response = await CostumerApi.getCustomers(customerId)

        expect(response.status).toBe(200)
    });

    it('should update customer with given id', async () => {
        const response = await CostumerApi.updateCostumer(customerId, newcustomerName)

        expect(response.status).toBe(200)
        expect(response.body.customerId).toEqual(customerId)
        expect(response.body.name).toEqual(newcustomerName)
    });

    it('should delete customer with given id', async () => {
        const response = await CostumerApi.deleteCustomer(customerId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)

    });
})






