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
        const response = await planogram.createProduct(token);
        productId = response.body.id;
        expect(response.status).toBe(201);
    });
    it('should return all products', async () => {
        const response = await planogram.getAllProduct(token);
        expect(response.status).toBe(200);
        foundProduct = response.body.find(e => e.id == productId);
        expect(foundProduct.id).toEqual(productId);
    })
    it('should return specific product with id', async () => {
        const response = await planogram.getProduct(token, productId);
        expect(response.body.id).toEqual(productId);
    })
    it('should delete product with specific id', async () => {
        const response = await planogram.deleteProduct(token, productId);
        expect(response.status).toBe(200)
    })
    it('should NOT returned deleted product', async () => {
        const response = await planogram.getProduct(token, productId);
        expect(response.status).toEqual(404);
    })
})