const getToken = require('./getToken')
const planogram = require('./polarisApis')


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

    // update planogram
    it('should update planogram id', async () => {
        const updatedPlanogram = await planogram.updatePlanogram(token,planogramId);
        expect(updatedPlanogram.status).toEqual(200);
    })

    //delete and check its status
    it('should delete planogram', async () => {
        const newPlanogram = await planogram.createPlanogram(token)
        planogramId = newPlanogram.body.id
        console.log("Line 40 " + planogramId);
        var deletedId = await planogram.deletePlanogram(planogramId);
        deletedId.status == "404" ? console.log("Id deleted") : console.log("look for error");
    
    });

    //Get deleted id
    it('should not returned deleted planogram', async() => {
        const newPlanogram = await planogram.createPlanogram(token);
        let idToBeDeleted = newPlanogram.body.id; 
        let deletedItem = await planogram.deletePlanogram(idToBeDeleted);
        expect(deletedItem.status).toEqual(404);

    })

    //PLANOGRM AND PROVISION

    //create new planogram-provision
    it('should create new planogram-provision', async () => {
        const newPlanogramAndProvision = await planogram.createPlanogramProvision(token)
        console.log(newPlanogramAndProvision.body);
        bodyID = newPlanogramAndProvision.body.id;
        console.log(newPlanogramAndProvision.status);
        expect(newPlanogramAndProvision.status).toBe(201);
    });
    // Get all
    it('should return all planogram-provision', async() => {
        let response = await planogram.getAllPlanogramProvision(token);
        expect(response.status).toEqual(200);
    })

    // Get id
    it('should return a specific planogram-provision by id', async() => {
        const newPlanogramProvision = await planogram.createPlanogramProvision(token);
        const returnedId = newPlanogramProvision.body.id
        const returningPP = await planogram.getPlanogramProvision(token, returnedId);
        expect(returningPP.body.id).toEqual(returnedId);
    })

    // Patch Planogram Provison ID --burada kaldin
    it("should update planogram-provision by id", async () => {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        const patchedId = await planogram.patchPlanogramProvision(token,planogramProvison.body.id);
        expect(patchedId.status).toEqual(200);
    })

    // Delete
    it('should delete planogram-provision', async() => {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        const deletedPP = await planogram.deletePlanogramProvision(token, planogramProvison.body.id);
        expect(deletedPP.status).toEqual(200);  
    })

    //Get deleted id ==> returnes 500 instead 404 (postman ans swagger have the same result)
    it('should NOT returned requested planogram-provision id', async()=> {
        const planogramProvison = await planogram.createPlanogramProvision(token);
        console.log(planogramProvison.body.id);
        const deletedPP = await planogram.deletePlanogramProvision(token, planogramProvison.body.id);
        console.log(deletedPP.status);
        const returningPP = await planogram.getPlanogramProvision(token, deletedPP);
        console.log(returningPP.status);
    })

    //PRODUCT
    //create new product
    it('should create new product', async () => {
        const newProduct = await planogram.createProduct(token);
        console.log(newProduct.body);
        expect(newProduct.status).toBe(201);
    });
    //returned all products
    it('should return all products', async () => {
        const allProducts = await planogram.getAllProduct(token);
        console.log(allProducts);
        expect(allProducts.body).toBeTruthy();
        expect(allProducts.status).toBe(200);
    })
   //returned specific product
    it('should return specific product with id', async () => {
        const newProduct = await planogram.createProduct(token);
        const returnedProduct = await planogram.getProduct(token, newProduct.body.id);
        expect(returnedProduct.body.id).toEqual(bodyId);
    })

    //delete product
    it('should delete product with specific id', async () => {
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        const deletedId = await planogram.deleteProduct(bodyId);
        console.log(deletedId.status);
        expect(deletedId.status).toBe(404)
    })

    //returned deleted product 401 returned ==> burada kaldin
    it('should NOT returned deleted product', async()=> {
        const newProduct = await planogram.createProduct(token);
        const deletedId = await planogram.deleteProduct(newProduct.body.id);
        console.log(deletedId);
        expect(deletedId.status).toEqual(404);
    })

    //PRODUCT FACING

    //create new product facing
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
        const facingId =8 ;
        const response = await planogram.getFacing(token, facingId);
        console.log(response);
        expect(response.status).toEqual(200);
    })

    //update specific facing product 

    it('should update product facing', async() => {
        const facingId =8 ;
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

    // STICHED IMAGE 
    // upload image --error

    it('should upload stitiched image', async()=> {
        const uploadedFile = await planogram.createStitchImage(token);
        console.log(uploadedFile.status);
    })
    //get stitched images

    it('should return a stiched image status 200', async() => {
        const stichImage = await planogram.getSticthedImage(token);
        expect(stichImage.status).toBe(200);
    })



    //HEALTH 
    //get

    it('should return  status of health ', async() => {
        const health = await planogram.getHealth(token);
        console.log(health.status);
        expect(health.status).toBe(200);
    })



})