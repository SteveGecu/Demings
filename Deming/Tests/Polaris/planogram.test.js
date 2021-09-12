const getToken = require('./getToken')
const planogram = require('./polarisApis')

describe('planogram tests', () => {
    let token
    let planogramId

    beforeAll(async () => {
        token = await getToken.getToken()
    })

    it('should create new planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        expect(newPlanogram.status).toBe(201)
        console.log(planogramId);
    });
    it('should verify last created planogram id', async () => {
        const allPlanograms = await planogram.getPlanograms(token)
        expect(allPlanograms.body.slice(-1)[0].id).toEqual(planogramId)
        expect(allPlanograms.status).toEqual(200)
    });

    it('should fetch new planogram', async () => {
        const newPlanogram = await planogram.getPlanogram(token, planogramId)
        expect(newPlanogram.status).toEqual(200)
        expect(newPlanogram.body.id).toEqual(planogramId)
    });
})