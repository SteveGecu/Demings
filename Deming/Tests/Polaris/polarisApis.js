const getToken = require('./getToken');
const fetch = require("node-fetch");
const planogramUrl = 'https://qa.planogram.demingrobotics.com/planogram/';
const planogramProvisionURL = "https://qa.planogram.demingrobotics.com/planogram-provision/";
const productURL = 'https://qa.planogram.demingrobotics.com/product/'
const productFacingURL = "https://qa.planogram.demingrobotics.com/product-facing"
const stichedImageURL = "https://qa.planogram.demingrobotics.com/stiched-image"

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

// PLANOGRAM-PROVISION NO ACCEESS
// POST
async function createPlanogramProvision(token) {
    const response = await fetch(planogramProvisionURL, {
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

// delete id
async function deletePlanogramProvision(id) {
    const response = await fetch(planogramProvisionURL, {
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
        body: JSON.stringify({})
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

// delete id
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

//PRODUCT-FACINGS

//Post 
async function createProductFacing(token, planogramId) {
    console.log(productFacingURL + "?planogramId=" + planogramId);
    const response = await fetch(productFacingURL + "?planogramId=" + planogramId, {
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
async function getProductFacing(token, planogramId) {
    const response = await fetch(productFacingURL + "?planogramId=" + planogramId, {
        method: 'GET',
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

//Get By RailId 
async function getRailId(token, railId) {
    const response = await fetch(productFacingURL + "?railId=" + railId + "&latest=true", {
        method: 'GET',
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

//STICHED-IMAGE
//upload the image
async function uploadStichedImage(token) {
    const response = await fetch(stichedImageURL, {
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



//HEALTH




module.exports = {
    createPlanogram,
    getPlanograms,
    getPlanogram,
    deletePlanogram,
    deleteData,
    createPlanogramProvision,
    getAllPlanogramProvision,
    getPlanogramProvision,
    deletePlanogramProvision,
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    createProductFacing,
    getAllProductFacing,
    getProductFacing,
    getRailId,
    getFacing,
    uploadStichedImage
}