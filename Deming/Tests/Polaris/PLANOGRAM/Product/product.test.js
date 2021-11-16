const getToken = require('../../getToken');
const planogram = require('./productAPI');


describe('Product tests creates new product, returns all products, search created new product, then updates and deletes it.', () => {
    let token;
    let productId; 
    let foundProduct

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    it('should create new product', async () => {
        const newProduct = await planogram.createProduct(token);
        productId = newProduct.body.id;
        expect(newProduct.status).toBe(201);
    });
    it('should return all products', async () => {
        const allProducts = await planogram.getAllProduct(token);
        expect(allProducts.status).toBe(200);
        foundProduct = allProducts.body.find( e => e.id == productId);
        expect(foundProduct.id).toEqual(productId);   
    })
    it('should return specific product with id', async () => {
        const returnedProduct = await planogram.getProduct(token, productId);
        expect(returnedProduct.body.id).toEqual(productId);
    })
    it('should delete product with specific id', async () => {
        const deletedId = await planogram.deleteProduct(token, productId);
        expect(deletedId.status).toBe(200)
    })
    it('should NOT returned deleted product', async()=> {
        const deletedId = await planogram.getProduct(token, productId);
        expect(deletedId.status).toEqual(404);
    })
})