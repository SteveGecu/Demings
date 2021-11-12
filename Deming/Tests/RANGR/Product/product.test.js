const ProductApi = require('./productApis')
const CategoryApi = require('../Category/categoryApi')
const productName = 'testAutoProdName'
const categoryName = 'testAutoCategory'
const newProductName = 'updatedName'
let categoryId
let productId

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR product Tests', () => {

    beforeAll(async () => {
        const response = await CategoryApi.createCategory(categoryName)
        categoryId = response.body.categoryId
    })

    it('should create product', async () => {
        const response = await ProductApi.createProduct(productName, categoryId)
        productId = response.body.productId

        expect(response.status).toBe(201)
        expect(response.body.name).toEqual(productName)
        expect(response.body.category.name).toEqual(categoryName)
    });

    it('should return all products', async () => {
        const response = await ProductApi.getProducts()

        expect(response.status).toBe(200)
    });

    it('should return product with given id', async () => {
        const response = await ProductApi.getProduct(productId)

        expect(response.status).toBe(200)
    });

    it('should update product with given id', async () => {
        const response = await ProductApi.updateProduct(productId, newProductName)

        expect(response.status).toBe(200)
        expect(response.body.name).toEqual(newProductName)
    });

    it('should delete product with given id', async () => {
        const response = await ProductApi.deleteProduct(productId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });

    afterAll(async () => {
        const response = await CategoryApi.deleteCategory(categoryId)
    })

})