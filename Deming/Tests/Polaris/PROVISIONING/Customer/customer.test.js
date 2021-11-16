const getToken = require('../../getToken');
const customerAPI = require('./customerAPI');


describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
    })

    //create customer 
    it('should create new customer', async()=> {
        const newCustomer = await customerAPI.createCustomer(token);
        console.log(newCustomer);
    })
   
})

