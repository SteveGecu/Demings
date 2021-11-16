const getToken = require('../../getToken')
const planogram = require('./stitchedImageAPI')

describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
    // STICHED IMAGE 

    // upload image --error- unknown
    // it('should upload stitiched image', async()=> {
    //     const uploadedFile = await planogram.createStitchImage(token);
    //     console.log(uploadedFile);
    // })

    //get stitched images
    it('should return a stiched image status 200', async () => {
        const response = await planogram.getSticthedImage(token);
        expect(response.status).toBe(200);
    })
    it('should return a specific image', async () => {
        const fileName = "Drones.xlsx";
        const response = await planogram.getSticthedImage(token);
        expect(response.body).toContain(fileName);
    })
    it('should delete a speicific image', async () => {
        const fileName = "foo.txt";
        const response = await planogram.getSticthedImage(token);
        await planogram.deleteImage(token, fileName);
        expect(response.body).toContain("Drones.xlsx");
    })
})