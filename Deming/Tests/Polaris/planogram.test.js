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

    //patch: there is no data to update
    it('should update planogram id', async () => {
        const allPlanograms = await planogram.getPlanograms(token)
        console.log(allPlanograms.body);
    })

    //delete and check its status
    it('should delete planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        console.log("Line 40 " + planogramId);
        var deletedId = await planogram.deletePlanogram(planogramId);
        deletedId.status == "404" ? console.log("Id deleted") : console.log("look for error");
        // const allPlanograms = await planogram.getPlanograms(token)
        // console.log("Line 44" + allPlanograms.body.id); 
        // console.log("Line 45" + deletedId);
    });
    //Get deleted id


    //PLANOGRM AND PROVISION

    //Post - same in POSTMAN 500 error

    it('should create new planogram-provision', async () => {
        const newPlanogramAndProvision = await planogram.createPlanogramProvision(token)
        console.log(newPlanogramAndProvision.body.id);
        bodyID = newPlanogramAndProvision.body.id;
        console.log(newPlanogramAndProvision.status);
        //expect(newPlanogramAndProvision.status).toBe(201);
    });
    // Get all

    // Get id

    // Delete

    //Get deleted id

    //PRODUCT

    it("should create new product", async () => {
        const newProduct = await planogram.createProduct(token);
        console.log(newProduct.body.id);
        expect(newProduct.status).toBe(201);
    });

    it("should return all products", async () => {
        const allProducts = await planogram.getAllProduct(token);
        console.log(allProducts.body);
        expect(allProducts.body).toBeTruthy();
        expect(allProducts.status).toBe(200);
    })

    it("should return specific product with id", async () => {
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        console.log(bodyId);
        const returnedProduct = await planogram.getProduct(token, bodyId);
        console.log(returnedProduct)
        expect(returnedProduct.body.id).toEqual(bodyId);
    })

    it("should delete product with specific id", async () => {
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        const deletedId = await planogram.deleteProduct(bodyId);
        //console.log(deletedId.status);
        expect(deletedId.status).toBe(404)
    })

    //PRODUCT FACING

    it("should create a newprodcut facing", async () => {
        const newPlanogram = await planogram.createPlanogram(token);
        const planogramId = newPlanogram.body.id
        console.log(planogramId);
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        console.log(bodyId);
        const newFacing = await planogram.createProductFacing(token, planogramId);
        console.log(newFacing);
    })




    // STICHED IMAGE 

    it('should upload stiched image', async () => {
        const stich = await planogram.createPlanogramProvision(token)
        console.log(newPlanogramAndProvision.body.id);
        bodyID = newPlanogramAndProvision.body.id;
        console.log(newPlanogramAndProvision.status);
        //expect(newPlanogramAndProvision.status).toBe(201);
    });


})