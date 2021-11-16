const getToken = require('../../getToken');
const planogram = require('./planogramAPI');


describe('Planogram Tests', () => {
    let token;
    let planogramId;
    let foundElement;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new planogram', async () => {
        const response = await planogram.createPlanogram(token)
        planogramId = response.body.id
        expect(response.status).toBe(201)
    });
    it('should return all planograms including previously created planogram', async () => {
        const response = await planogram.getPlanograms(token);
        expect(response.status).toBe(200);
        foundElement = response.body.find(element => element.id == planogramId);
        expect(foundElement.id).toEqual(planogramId);
    })
    it('should return a specific planogram id', async () => {
        const response = await planogram.getPlanogram(token, planogramId)
        expect(response.body.id).toEqual(planogramId)
    });
    it('should update planogram id', async () => {
        const response = await planogram.updatePlanogram(token, planogramId);
        expect(response.status).toEqual(200);
    })
    it('should delete a speicifc planogram', async () => {
        const response = await planogram.deletePlanogram(planogramId);
        expect(response.status).toBe(404);
    });
    it('should not returned deleted planogram', async () => {
        const response = await planogram.deletePlanogram(planogramId);
        expect(response.status).toEqual(404);
    })
})
