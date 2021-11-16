const getToken = require('../../getToken');
const planogram = require('./productFacingsAPI');


describe('Product-Facings tests, creates new Product-facings, finds all facings, find a specific facing, updates and deletes it', () => {
    let token;
    let planogramId;
    let productId;
    let facingId;
    let foundFacing;
    let railId;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create a new prodcut facing', async () => {
        const newPlanogramResponse = await planogram.createPlanogram(token);
        planogramId = newPlanogramResponse.body.id
        const newProductResponse = await planogram.createProduct(token);
        productId = newProductResponse.body.id;
        const newFacingResponse = await planogram.createProductFacing(token, planogramId);
        facingId = newFacingResponse.body.productFacings[0].id
        expect(newFacingResponse.status).toBe(201);
    })

    //get all product facings
    it('should return all product facings', async () => {
        const allFacings = await planogram.getAllProductFacing(token);
        expect(allFacings.status).toEqual(200);
        foundFacing = allFacings.body.find(e => e.id == facingId);
        expect(foundFacing.id).toEqual(facingId);
    })

    //get specific product facing by planogramid
    it('should return specific product facing by using planogramId', async () => {
        const response = await planogram.getProductFacingByPlanogramId(token, planogramId);
        expect(response.status).toEqual(200);
    })

    //get specific product facing by railId 
    it('should return product facings by using rail id', async () => {
        railId = "3CC98021-CBB8-4699-B65B-2B47CF8D4B34";
        const response = await planogram.getProductFacingByRailId(token, railId);
        expect(response.status).toEqual(200);
    })

    //get specific facing product by facing id

    it('should return product facing by using facing', async () => {
        const response = await planogram.getFacing(token, facingId);
        expect(response.status).toEqual(200);
    })

    //update specific facing product 
    it('should update product facing', async () => {
        const response = await planogram.updateProductFacing(token, facingId);
        expect(response.status).toBe(200);
    })

    //delete product facing
    it('should delete product facing', async () => {
        const response = await planogram.deleteProductFacing(token, facingId);
        expect(response.status).toBe(200);
    })
    //returned deleted product facing
    it('should NOT returned deleted product facing', async () => {
        await planogram.deleteProductFacing(token, facingId);
        const returnedDeletedItem = await planogram.getFacing(token, facingId);
        expect(returnedDeletedItem.status).toBe(404);
    })
})