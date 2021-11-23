const getToken = require('../../getToken');
const storeAPI = require('./storeAPI');

describe('Store tests, it creates new store, gets all store lists and created store, updates and deletes created store', () => {
    let token;
    let id;
    
    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create a new store', async()=> {
      response = await storeAPI.createStore(token);
      id = response.body.id;
      expect(response.status).toEqual(201);
    })
    it('should return all stores', async() => {
        const response =await storeAPI.getStores(token);
        expect(response.status).toEqual(200);
    })
    it('should return specific store', async()=> {
        const response = await storeAPI.getStore(token, id);
        expect(response.body.id).toEqual(id);
    })
    it('should update store', async()=> {
        const response = await storeAPI.updateStore(token, id);
        expect(response.status).toEqual(200);
    })
    it('should delete specific store', async()=> {
        const response = await storeAPI.deleteStore(token,id);
        expect(response.status).toEqual(200);
    })
    it('should NOT retuned deleted stores', async()=> {
        const response = await storeAPI.getStore(token, id);
        expect(response.status).toEqual(404);
    })


})