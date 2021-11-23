const getToken = require('../../getToken');
const aisleAPI = require('./aisleAPI');

describe('Aisle tests, it creates new aisle, gets all aisle lists and created aisle, updates and deletes created aisle', () => {
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
    it('should return all aisles', async()=> {
        const response = await aisleAPI.getAisles(token);
        expect(response.status).toEqual(200);
    })
    it('should return a specific aisle created', async()=> {
        const response = await aisleAPI.getAisle(token, id);
        expect(response.status).toEqual(200);
    })
    it('should update aisle', async()=> {
        const response = await aisleAPI.updateAisle(token,id);
        expect(response.status).toEqual(200);
    })
    it('should delete specific id', async()=> {
        const response = await aisleAPI.deleteAisle(token,id);
        expect(response.status).toEqual(200);
    })
    it('should NOT returned deleted id', async() => {
        const response = await aisleAPI.getAisle(token, id);
        expect(response.status).toEqual(404);
    })
})