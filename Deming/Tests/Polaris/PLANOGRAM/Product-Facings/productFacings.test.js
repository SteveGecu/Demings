const getToken = require('../../getToken');
const planogram = require('./productFacingsAPI');


describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create a newprodcut facing', async () => {
        const newPlanogram = await planogram.createPlanogram(token);
        const planogramId = newPlanogram.body.id
        console.log(planogramId);
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        console.log(bodyId);
        const newFacing = await planogram.createProductFacing(token, planogramId);
        console.log(newFacing);
        expect(newFacing.status).toBe(201);
    })

    //get all product facings
    it('should return all product facings', async () => {
        const allFacings = await planogram.getAllProductFacing(token);
        //console.log(allFacings.status);
        expect(allFacings.status).toEqual(200);
    })

    //get specific product facing by planogramid
    it('should return specific product facing by using planogramId', async() => {
        const newPlanogram = await planogram.createPlanogram(token);
        console.log(newPlanogram)
        const response = await planogram.getProductFacingByPlanogramId(token, newPlanogram.body.id);
        expect(response.status).toEqual(200);
    })


    //get specific product facing by railId 
    it('should return product facings by using rail id', async()=> {
        const railId = "3CC98021-CBB8-4699-B65B-2B47CF8D4B34"; 
        const response = await planogram.getProductFacingByRailId(token, railId);
        expect(response.status).toEqual(200);
    })

    //get specific facing product by facing id

    it('should return product facing by using facing', async()=> {
        const facingId =15 ;
        const response = await planogram.getFacing(token, facingId);
        console.log(response);
        expect(response.status).toEqual(200);
    })

    //update specific facing product 

    it('should update product facing', async() => {
        const facingId =15 ;
        const response = await planogram.updateProductFacing(token, facingId);
        console.log(response);
        expect(response.status).toBe(200);
    })

    //delete product facing
    it('should delete product facing', async()=> {
        const facingId =8;
        const response = await planogram.deleteProductFacing(token, facingId);
        console.log(response);
        expect(response.status).toBe(404);
    })
    //returned deleted product facing
    it('should NOT returned deleted product facing', async()=> {
        const facingId =8;
        const response = await planogram.deleteProductFacing(token, facingId);
        console.log(response);
        const returnedDeletedItem = await planogram.getFacing(token, facingId);
        expect(returnedDeletedItem.status).toBe(404);
    })

    //delete product facing by planogram id
    it('should delete product facing by using planogram id ', async()=> {
        const newPlanogram = await planogram.createPlanogram(token);
        const response = await planogram.deleteProductFacingByPlanogramId(token, newPlanogram.body.id);
        expect(response.status).toBe(404);
    })

    //delete prdoct facing by product id
    it('should delete product facing by using product id', async()=> {
        const newProduct = await planogram.createProduct(token);
        const response = await planogram.deleteProductFacingByProductId(token, newProduct.body.id);
        console.log(response.status);
        expect(response.status).toBe(404);
    })
})