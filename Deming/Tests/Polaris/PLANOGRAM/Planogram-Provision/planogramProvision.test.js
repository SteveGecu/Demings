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
        const newPlanogramAndProvision = await planogram.createPlanogramProvision(token)
        bodyId = newPlanogramAndProvision.body.id;
        expect(newPlanogramAndProvision.status).toBe(201);
    });
    it('should return all planogram-provision', async() => {
        let response = await planogram.getAllPlanogramProvision(token);
        expect(response.status).toEqual(200);
        foundElement = response.body.find( element => element.id == bodyId);
        expect(foundElement.id).toEqual(bodyId);
    })
    it('should return a specific planogram-provision by id', async() => {
        const returningPP = await planogram.getPlanogramProvision(token, bodyId);
        expect(returningPP.body.id).toEqual(bodyId);
    })
    it("should update planogram-provision by id", async () => {
        const patchedId = await planogram.patchPlanogramProvision(token, bodyId);
        expect(patchedId.status).toEqual(200);
    })
    it('should delete planogram-provision', async() => {
        const deletedPP = await planogram.deletePlanogramProvision(token, bodyId);
        expect(deletedPP.status).toEqual(200);  
    })
    it('should NOT returned requested planogram-provision id', async()=> {
        const returningPP = await planogram.getPlanogramProvision(token, bodyId);
        expect(returningPP.status).toEqual(404);
    })
})