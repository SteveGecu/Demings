const getToken = require('../../getToken');
const droneProvisionAPI = require('./droneProvisionAPI');

describe('Drone Provisoning tests, it creates new Drone Provisoning , gets all Drone Provisoning  lists and created store, updates and deletes created Drone Provisoning ', () => {
    let token;
    let response;
    let id
    
    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new Drone Provisoning ', async()=> {
        response = await droneProvisionAPI.createDroneProvision(token);
        id = response.body.id
        expect(response.status).toEqual(201);
    })
    it('should return all Drone Provisoning ', async()=> {
        let response = await droneProvisionAPI.getDroneProvisions(token);
        expect(response.status).toEqual(200);
    })
    it('should return specific Drone Provisoning ', async()=> {
        let response = await droneProvisionAPI.getDroneProvision(token, id);
        expect(response.status).toEqual(200);
    })
    it('should update specific Drone Provisoning', async()=> {
        let response = await droneProvisionAPI.getDroneProvision(token, id);
        expect(response.status).toEqual(200);
    })
    it('should delete specific Drone Provisoning', async()=> {
        let response = await droneProvisionAPI.deleteDroneProvision(token,id)
        expect(response.status).toEqual(200);
    })
    it('should NOT retuned deleted Drone Provisoning', async()=> {
        let response = await droneProvisionAPI.getDroneProvision(token,id)
        expect(response.status).toEqual(404);
    })
})