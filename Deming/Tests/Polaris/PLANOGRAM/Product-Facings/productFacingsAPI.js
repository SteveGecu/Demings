const getToken = require('./productFacings.test');
const fetch = require("node-fetch");
const productFacingURL = "https://qa.planogram.demingrobotics.com/product-facing";
const productURL = 'https://qa.planogram.demingrobotics.com/product/';
const planogramUrl = 'https://qa.planogram.demingrobotics.com/planogram/';


//Post Product Facing
async function createProductFacing(token, planogramId) {
    console.log(productFacingURL + "?planogramId=" + planogramId);
    const response = await fetch(productFacingURL + "?planogramId=" + planogramId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({
            "productFacings": [
        {
            "productId": 99,
            "x": 0.8892,
            "y": 0.3334,
            "width": 0.1,
            "height": 0.1
         } ]
        })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

// Get all 
async function getAllProductFacing(token) {
    let response = await fetch(productFacingURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    });
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}


//Get by Planogram Id 
async function getProductFacingByPlanogramId(token, planogramId) {
    const response = await fetch(productFacingURL + "/?planogramId=" + planogramId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//Get By RailId 
async function getProductFacingByRailId(token, railId) {
    const response = await fetch(productFacingURL + "/?railId=" + railId + "&latest=true", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//Get by Facing Id 
async function getFacing(token, facingId) {
    let response = await fetch(productFacingURL + "/" + facingId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    });
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

//patch  prodcut facing 

async function updateProductFacing(token, prodcutFacingId){
    let response = await fetch(productFacingURL + '/' + prodcutFacingId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({ 
            "x": 0.3334,
            "y": 0.8892
         })
    });
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

//delete product facing
async function deleteProductFacing(token, prodcutFacingId){
    let response = await fetch(productFacingURL + '/' + prodcutFacingId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}
// delete product facing by planogram id
async function deleteProductFacingByPlanogramId(token, planogramId){
    let response = await fetch(productFacingURL + '/' + planogramId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

//delete product
async function deleteProductFacingByProductId(token, productId){
    let response = await fetch(productFacingURL + '/' + productId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

//create product
async function createProduct(token) {
    const response = await fetch(productURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({
            "name": "product",
            "friendlyName": "friendlyName",
            "upc": "asdf",
            "barcode": "fdsa"
        })
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//create planogram
async function createPlanogram(token) {
    const response = await fetch(planogramUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({})
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

module.exports = {
    createProductFacing,
    getAllProductFacing,
    getProductFacingByPlanogramId,
    getProductFacingByRailId,
    getFacing,
    updateProductFacing,
    deleteProductFacing,
    deleteProductFacingByPlanogramId,
    deleteProductFacingByProductId,
    createProduct,
    createPlanogram
}