const getToken = require('../../getToken');
const planogram = require('./planogramProvisionAPI');


describe('Planogram-Provision tests, creates new Planogram-Provision, returns all Planogram-Provision, search created Planogram-Provision, then updates and deletes it.', () => {
    let token;
    let bodyId;
    let foundElement;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new planogram-provision', async () => {
        const response = await planogram.createPlanogramProvision(token)
        bodyId = response.body.id;
        expect(response.status).toBe(201);
    });
    it('should return all planogram-provision', async () => {
        const response = await planogram.getAllPlanogramProvision(token);
        expect(response.status).toEqual(200);
        foundElement = response.body.find(element => element.id == bodyId);
        expect(foundElement.id).toEqual(bodyId);
    })
    it('should return a specific planogram-provision by id', async () => {
        const response = await planogram.getPlanogramProvision(token, bodyId);
        expect(response.body.id).toEqual(bodyId);
    })
    it("should update planogram-provision by id", async () => {
        const response = await planogram.patchPlanogramProvision(token, bodyId);
        expect(response.status).toEqual(200);
    })
    it('should delete planogram-provision', async () => {
        const response = await planogram.deletePlanogramProvision(token, bodyId);
        expect(response.status).toEqual(200);
    })
    it('should NOT returned requested planogram-provision id', async () => {
        const response = await planogram.getPlanogramProvision(token, bodyId);
        expect(response.status).toEqual(404);
    })
})