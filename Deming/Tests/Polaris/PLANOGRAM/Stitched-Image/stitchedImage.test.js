const getToken = require('../../getToken')
const planogram = require('./stitchedImageAPI')

describe('planogram tests', () => {
    let token;

    beforeAll(async () => {
        token = await getToken.getToken()
    })
     // STICHED IMAGE 
    
    // upload image --error- unknown
    it('should upload stitiched image', async()=> {
        const uploadedFile = await planogram.createStitchImage(token);
        console.log(uploadedFile);
    })

    //get stitched images
    it('should return a stiched image status 200', async() => {
        const stichImage = await planogram.getSticthedImage(token);
        expect(stichImage.status).toBe(200);
    })

    //download stiched images
    it('should return a specific image', async() => {
      const fileName = "Drones.xlsx";  
      const downloadedImages = await planogram.getSticthedImage(token);
      console.log(downloadedImages);
      expect(downloadedImages.body).toContain(fileName);
    })

    //delete stiched images
    it('should delete a speicific image', async() => {
        const fileName = "foo.txt";  
        const found = await planogram.getSticthedImage(token);
        const deletedItem = await planogram.deleteImage(token, fileName);
        console.log(found);
        expect(found.body).toContain("Drones.xlsx");
    })
})