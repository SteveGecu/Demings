const rangersGetAPI = require('./rangersGetAPI') ;
const rangerPostAPI = require('./rangersPostAPI');

describe('RANGERS health tests', () => {
   //HEALTHZ
    it('should return status of healthz', async () => {
        const  checkHealth = await rangersGetAPI.getHealthZ(); 
        expect(checkHealth.status).toBe(200)
        console.log(checkHealth)
    });

    //PROVISION
    //GET PROVISION DOESNOT WORK WITH THIS SOLUTION
    it('should return status of provision', async () => {
        const  checkHealth = await rangersGetAPI.getProvison(); 
        expect(checkHealth.status).toBe(200)
    });

    //GET PROVISION WORKS WITH THIS SOLUTION

    it('should return status of provision with function 2', async () => {
        return rangersGetAPI.getProvison().then(data => {
            expect(data.status).toBe(200);
        })
    });

    // GETTING 404
    it('should be able to post in provision', async () => {
        const  checkHealth = await rangerPostAPI.createProvision(); 
        expect(checkHealth.status).toBe(201);
    });

    it('should return status of customers', async () => {
        const  checkHealth = await rangersGetAPI.getCustomers(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of customer', async () => {
        const  checkHealth = await rangersGetAPI.getCustomer(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return create customer', async () => {
        const  checkHealth = await rangerPostAPI.createCUSTOMER2(); 
        expect(checkHealth.status).toBe(409)
    });


     it('should return status of customer', async () => {
        const  response = await rangerPostAPI.createCustomers2(); 
        expect(response.status).toBe(200)
    });


    it('should return status of stores', async () => {
        const  checkHealth = await rangersGetAPI.getStores(); 
        expect(checkHealth.status).toBe(200)
    });
    
    it('should return status of store', async () => {
        const  checkHealth = await rangersGetAPI.getStore(); 
        expect(checkHealth.status).toBe(200)
    });
    
    it('should return status of devices', async () => {
        const  checkHealth = await rangersGetAPI.getDevices(); 
        expect(checkHealth.status).toBe(200)
    });
    it('should return status of device', async () => {
        const  checkHealth = await rangersGetAPI.getDevice(); 
        expect(checkHealth.status).toBe(200)
    });

     //GET DEVICE DSN DOESNOT WORK WITH THIS SOLUTION
    it('should return status of device dsn', async () => {
        const  checkHealth = await rangersGetAPI.getDeviceDSN(); 
        expect(checkHealth.status).toBe(200)
    });

     //GET DEVICE DSN WORKS WITH THIS SOLUTION  - instable result
    it('should return status of DEVICE DSN with function 2', async () => {
        return rangersGetAPI.getDeviceDSN().then(data => {
            expect(data.status).toBe(200);
        })
    });

   //GET AREA DOESNOT WORK WITH THIS SOLUTION

    it('should return status of area', async () => {
        const  checkHealth = await rangersGetAPI.getArea(); 
        expect(checkHealth.status).toBe(200)
    });

    //GET AREA WORKS WITH THIS SOLUTION

    it('should return status of AREA with function 2', async () => {
        return rangersGetAPI.getArea().then(data => {
            expect(data.status).toBe(200);
        })
    });


    it('should return status of area id', async () => {
        const  checkHealth = await rangersGetAPI.getAreaId(); 
        expect(checkHealth.status).toBe(200)
    });

       //GET AREA DOESNOT WORK WITH THIS SOLUTION

    it('should return status of location', async () => {
        const  checkHealth = await rangersGetAPI.getLocation(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of LOCATION with function 2', async () => {
        return rangersGetAPI.getLocation().then(data => {
            expect(data.status).toBe(200);
        })
    });

    it('should return status of location id', async () => {
        const  checkHealth = await rangersGetAPI.getLocationId(); 
        expect(checkHealth.status).toBe(200)
    });

   //GET SHELF DOESNOT WORK WITH THIS SOLUTION

    it('should return status of shelf-size', async () => {
        const  checkHealth = await rangersGetAPI.getShelf(); 
        expect(checkHealth.status).toBe(200)
    });

     //GET SHELF  WORKS WITH THIS SOLUTION
    it('should return status of SHELF SIZE with function 2', async () => {
        return rangersGetAPI.getShelf().then(data => {
            expect(data.status).toBe(200);
        })
    });

    it('should return status of shelf-size id', async () => {
        const  checkHealth = await rangersGetAPI.getShelfId(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of facing', async () => {
        const  checkHealth = await rangersGetAPI.getFacing(); 
        expect(checkHealth.status).toBe(200)
    });
    it('should return status of facing Id', async () => {
        const  checkHealth = await rangersGetAPI.getFacingId(); 
        expect(checkHealth.status).toBe(200)
    });
    it('should return status of categories', async () => {
        const  checkHealth = await rangersGetAPI.getCategory(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of category id', async () => {
        const  checkHealth = await rangersGetAPI.getCategoryId(); 
        expect(checkHealth.status).toBe(200)
    });

    //GET PRODUCT DOESNT WORK WITH THIS SOLUTION
    it('should return status of product', async () => {
        const  checkHealth = await rangersGetAPI.getProduct(); 
        expect(checkHealth.status).toBe(200)
    });

    //GET PRODUCT WORKS WITH PRODUCT
    it('should return status of PRODUCT with function 2', async () => {
        return rangersGetAPI.getProduct().then(data => {
            expect(data.status).toBe(200);
        })
    });

    it('should return status of product id', async () => {
        const  checkHealth = await rangersGetAPI.getProductId();
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of product-provision', async () => {
        const  checkHealth = await rangersGetAPI.getProductProvision(); 
        expect(checkHealth.status).toBe(200)
    });

    it('should return status of PRODUCT PROVISION with function 2', async () => {
        return rangersGetAPI.getProductProvision().then(data => {
            expect(data.status).toBe(200);
        })
    });

}
)