const getToken = require('../../getToken');
const customerAPI = require('./customerAPI');


describe('Customer tests, it creates new customer, gets all customer lists and created customer, updates and deletes created customer', () => {
    let token;
    let response;
    let id;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new customer', async()=> {
        response = await customerAPI.createCustomer(token);
        id = response.body.id;
        expect(response.status).toEqual(201);
    })
    it('should return all customers', async()=> {
        const response = await customerAPI.getCustomers(token);
        expect(response.status).toEqual(200);
    })
    it('should return a specific customer', async() => {
        const response = await customerAPI.getCustomer(token, id);
        expect(response.body.id).toEqual(id);
    })
    it('should update specific customer', async()=> {
        const response = await customerAPI.updateCustomer(token,id);
        expect(response.status).toEqual(200);
    })
    it('should delete specific customer', async() => {
        const response = await customerAPI.deleteCustomer(token, id);
        expect(response.status).toEqual(200); 
    })
    it('should NOT returned deleted customer', async() => {
        const response = await customerAPI.getCustomer(token, id);
        expect(response.status).toEqual(404); 
    })
})