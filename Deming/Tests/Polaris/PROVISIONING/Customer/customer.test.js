const getToken = require('../../getToken');
const customerAPI = require('./customerAPI');


describe('Customer tests, it creates new customer, gets all customer lists and created customer, updates and deletes created customer', () => {
    let token;
    let customer;
    let customerNo;
    let customerName;

    beforeAll(async () => {
        token = await getToken.getToken()
    })

    //create customer 
    it('should create new customer', async()=> {
        customer = await customerAPI.createCustomer(token);
        customerNo = customer.body.id;
        customerName = customer.body.name;
        expect(customer.status).toEqual(201);
    })
    it('should return all customers', async()=> {
        const allCustomers = await customerAPI.getCustomers(token);
        expect(allCustomers.status).toEqual(200);
    })
    it('should return a specific customer', async() => {
        const customer = await customerAPI.getCustomer(token, customerNo);
        expect(customer.body.id).toEqual(customerNo);
    })
    it('should update specific customer', async()=> {
        const updatedCustomer = await customerAPI.updateCustomer(token,customerNo);
        expect(updatedCustomer.status).toEqual(200);
    })
    it('should delete specific customer', async() => {
        const deletedCustomer = await customerAPI.deleteCustomer(token, customerNo);
        expect(deletedCustomer.status).toEqual(200); 
    })

})