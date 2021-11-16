const getToken = require('../../getToken');
const planogram = require('./planogramAPI');


describe('planogram tests it creates a new planogram then returns the lists of planogram, searches a created planogram, finds and deletes it. ', () => {
    let token;
    let planogramId;
    let foundElement;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        expect(newPlanogram.status).toBe(201)
    });
    it('should return all planograms including previously created planogram', async () => {
        const response = await planogram.getPlanograms(token); 
        expect(response.status).toBe(200);
        foundElement = response.body.find(element => element.id == planogramId);
        expect(foundElement.id).toEqual(planogramId);
    })
    it('should return a specific planogram id', async () => {
        const returnedPlanogram = await planogram.getPlanogram(token, planogramId)
        expect(returnedPlanogram.body.id).toEqual(planogramId)
    });
    it('should update planogram id', async () => {
        const updatedPlanogram = await planogram.updatePlanogram(token,planogramId);
        expect(updatedPlanogram.status).toEqual(200);
    })
    it('should delete a speicifc planogram', async () => {
        const deletedId = await planogram.deletePlanogram(planogramId);
        expect(deletedId.status).toBe(404);
    });
    it('should not returned deleted planogram', async() => {
        const deletedItem = await planogram.deletePlanogram(planogramId);
        expect(deletedItem.status).toEqual(404);
    })
})
