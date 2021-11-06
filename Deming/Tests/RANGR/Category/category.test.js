const CategoryApi = require('./categoryApi')

const categoryName = 'testAutoCategoryName'
const newCategoryName = 'newTestAutoCategoryName'
let categoryId

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Category Tests', () => {

    it('should create category', async () => {
        const response = await CategoryApi.createCategory(categoryName)
        categoryId = response.body.categoryId

        expect(response.status).toBe(201)
        expect(response.body.categoryId).toHaveProperty
        expect(response.body.name).toEqual(categoryName)
    });

    it('should return all categorys', async () => {
        const response = await CategoryApi.getCategories()
        const actualCategoryName = response.body.find(a => a.name === categoryName)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty
        expect(actualCategoryName.name).toBe(categoryName)
    });

    it('should return category with given id', async () => {
        const response = await CategoryApi.getCategory(categoryId)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(categoryName)
    });

    it('should update category with given id', async () => {
        const response = await CategoryApi.updateCategory(categoryId, newCategoryName)

        expect(response.status).toBe(200)
        expect(response.body.name).toEqual(newCategoryName)
    });

    it('should delete category with given id', async () => {
        const response = await CategoryApi.deleteCategory(categoryId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });
})