const getToken = require('./getToken');
const fetch = require("node-fetch");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs"); 
const { fileURLToPath } = require('url');
const planogramUrl = 'https://qa.planogram.demingrobotics.com/planogram/';
const planogramProvisionURL = "https://qa.planogram.demingrobotics.com/planogram-provision/";
const productURL = 'https://qa.planogram.demingrobotics.com/product/';
const productFacingURL = "https://qa.planogram.demingrobotics.com/product-facing";
const sticthedImageURL = "https://qa.planogram.demingrobotics.com/stitched-image/";
const healthCheckUrl = 'https://qa.planogram.demingrobotics.com/health';

//PLANOGRAM 

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

//get planograms
async function getPlanograms(token) {
    let response = await fetch(planogramUrl, {
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

//get planogram with a specific id
async function getPlanogram(token, planogramId) {
    let response = await fetch(planogramUrl + planogramId, {
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

// update planogram
async function updatePlanogram(token, planogramId) {
    let response = await fetch(planogramUrl + planogramId, {
        method: 'PATCH',
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

// delete function for planogram
async function deletePlanogram(planogramId) {
    const response = await fetch(planogramUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ planogramId }`
        },
        body: JSON.stringify({ planogramId })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }

}
// delete function for  planogram
async function deleteData(planogramId) {
    const response = await fetch(planogramUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ planogramId }`
        },
        body: JSON.stringify({ planogramId })
    })

    const data = await response.json();
    console.log(data)
}

// PLANOGRAM-PROVISION 
// POST need rail id and planogram id
async function createPlanogramProvision(token) {
    const response = await fetch(planogramProvisionURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`     
        },
        body: JSON.stringify({
            'railId': '5C86F287-AF14-4ECB-8EDE-EA762397D9C3',
            'planogramId':0
        })
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headersThis 
    }
}

// Get all 
async function getAllPlanogramProvision(token) {
    let response = await fetch(planogramProvisionURL, {
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
//Get specific id
async function getPlanogramProvision(token, id) {
    let response = await fetch(planogramProvisionURL + id, {
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

//patch id S
async function patchPlanogramProvision(token, id) {
    const response = await fetch(planogramProvisionURL + id, {
        method: 'PATCH',
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

// delete id
async function deletePlanogramProvision(token,id) {
    const response = await fetch(planogramProvisionURL +id, {
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
        headers: response.statusText
    }
}

//get deleted id => no need to write new function

//PRODUCT
//POST
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

// Get all 
async function getAllProduct(token) {
    let response = await fetch(productURL, {
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

//Get specific id
async function getProduct(token, id) {
    let response = await fetch(productURL + id, {
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

// delete product 
async function deleteProduct(id) {
    const response = await fetch(productURL, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ id }`
        },
        body: JSON.stringify({ id })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}
// get deleted id => no function required for this

//PRODUCT-FACINGS

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

//STITCHED-IMAGE
//upload the image //
async function createStitchImage(token){
    const response = await fetch(sticthedImageURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({ 
            "fileName": "somefile.txt",
            "fileContents" : "SOMETEXT"
         })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}


//get stitched image
async function getSticthedImage(token) {
    const response = await fetch(sticthedImageURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//download
//delete


//HEALTH

//get 
async function getHealth(token) { 
const response = await fetch(healthCheckUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
    });
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}


module.exports = {
    //createPlanogram,
    getPlanograms,
    getPlanogram,
    updatePlanogram,
    deletePlanogram,
    deleteData,
    createPlanogramProvision,
    getAllPlanogramProvision,
    getPlanogramProvision,
    patchPlanogramProvision,
    deletePlanogramProvision,
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    createProductFacing,
    getAllProductFacing,
    getProductFacingByPlanogramId,
    getProductFacingByRailId,
    getFacing,
    updateProductFacing,
    deleteProductFacing,
    deleteProductFacingByPlanogramId,
    deleteProductFacingByProductId,
    createStitchImage,
    getSticthedImage,
    getHealth
}