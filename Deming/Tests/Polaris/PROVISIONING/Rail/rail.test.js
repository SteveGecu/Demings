const getToken = require('../../getToken');
const railAPI = require('./railAPI');

describe('Rail tests, it creates new rail, gets all rail lists and created rail, updates and deletes created rail', () => {
    let token;
    let response;
    let id; 
    
    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new rail', async()=> {
        response = await railAPI.createRail(token);
        id = response.body.id;
        expect(response.status).toEqual(201);
    })
    it('should return all rails', async()=> {
        let response = await railAPI.getRails(token);
        expect(response.status).toEqual(200);
    })
    it('should return rail with a specific id', async()=> {
        let response = await railAPI.getRail(token,id);
        expect(response.status).toEqual(200);
    })
    it('should update rail with a specific id', async()=> {
        let response = await railAPI.updateRail(token, id);
        expect(response.status).toEqual(200);
    })
    it('should delete rail', async()=> {
        let response = await railAPI.deleteRail(token, id);
        expect(response.status).toEqual(200);
    })
    it('should NOT returned deleted rail', async()=> {
        let response = await railAPI.getRail(token, id);
        expect(response.status).toEqual(404);
    })





})