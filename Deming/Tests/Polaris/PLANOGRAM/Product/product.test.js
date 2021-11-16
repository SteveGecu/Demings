const getToken = require('../../getToken');
const planogram = require('./productAPI');


describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
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
        expect(returnedProduct.body.id).toEqual(newProduct.body.id);
    })

    //delete product
    it('should delete product with specific id', async () => {
        const newProduct = await planogram.createProduct(token);
        const bodyId = newProduct.body.id;
        const deletedId = await planogram.deleteProduct(bodyId);
        console.log(deletedId.status);
        expect(deletedId.status).toBe(404)
    })

    //returned deleted product
    it('should NOT returned deleted product', async()=> {
        const newProduct = await planogram.createProduct(token);
        const deletedId = await planogram.deleteProduct(newProduct.body.id);
        expect(deletedId.status).toEqual(404);
    })
})