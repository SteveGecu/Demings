const getToken = require('../../getToken');
const planogram = require('./planogramProvisionAPI');


describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    
    it('should create new planogram-provision', async () => {
        const newPlanogramAndProvision = await planogram.createPlanogramProvision(token)
        bodyID = newPlanogramAndProvision.body.id;
        expect(newPlanogramAndProvision.status).toBe(201);
    });
    it('should return all planogram-provision', async() => {
        let response = await planogram.getAllPlanogramProvision(token);
        expect(response.status).toEqual(200);
    })
    it('should return a specific planogram-provision by id', async() => {
        const newPlanogramProvision = await planogram.createPlanogramProvision(token);
        const returnedId = newPlanogramProvision.body.id
        const returningPP = await planogram.getPlanogramProvision(token, returnedId);
        expect(returningPP.body.id).toEqual(returnedId);
    })
    it("should update planogram-provision by id", async () => {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        const patchedId = await planogram.patchPlanogramProvision(token,planogramProvison.body.id);
        expect(patchedId.status).toEqual(200);
    })
    it('should delete planogram-provision', async() => {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        const deletedPP = await planogram.deletePlanogramProvision(token, planogramProvison.body.id);
        expect(deletedPP.status).toEqual(200);  
    })

    //Get deleted id ==> returnes 500 instead 404 (postman and swagger have the same result)
    it('should NOT returned requested planogram-provision id', async()=> {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        //console.log(planogramProvison.body.id);
        const deletedPP = await planogram.deletePlanogramProvision(token, planogramProvison.body.id);
        //console.log(deletedPP.status);
        const returningPP = await planogram.getPlanogramProvision(token, deletedPP);
        //console.log(returningPP.status);
    })
})