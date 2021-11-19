const getToken = require('../../getToken');
const aisleAPI = require('./aisleAPI');

describe('Customer tests, it creates new customer, gets all customer lists and created customer, updates and deletes created customer', () => {
    let token;
    let response;
    let id;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create  new aisle in specific store', async()=> {
        response = await aisleAPI.createAisle(token);
        id = response.body.id
        expect(response.status).toEqual(201);
    })  
})