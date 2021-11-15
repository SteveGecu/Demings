const getToken = require('../../getToken');
const planogram = require('./planogramAPI');


describe('planogram tests', () => {
    let token;
    let planogramId;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        expect(newPlanogram.status).toBe(201)
        console.log(planogramId);
    });
    it('should return all planograms', async () => {
        const response = await planogram.getPlanograms(token); 
        expect(response.status).toBe(200);
    })
    it('should fetch new planogram id', async () => {
        const newPlanogram = await planogram.getPlanogram(token, planogramId)
        expect(newPlanogram.status).toEqual(200)
        expect(newPlanogram.body.id).toEqual(planogramId)
    });
    it('should update planogram id', async () => {
        const updatedPlanogram = await planogram.updatePlanogram(token,planogramId);
        expect(updatedPlanogram.status).toEqual(200);
    })
    it('should delete planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        var deletedId = await planogram.deletePlanogram(planogramId);
        //deletedId.status == "404" ? console.log("Id deleted") : console.log("look for error");
        expect(deletedId.status).toBe(404);
    });

    //Get deleted id
    it('should not returned deleted planogram', async() => {
        const newPlanogram = await planogram.createPlanogram(token);
        let idToBeDeleted = newPlanogram.body.id; 
        let deletedItem = await planogram.deletePlanogram(idToBeDeleted);
        expect(deletedItem.status).toEqual(404);

    })
})
