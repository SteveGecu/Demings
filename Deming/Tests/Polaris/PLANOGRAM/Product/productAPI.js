const getToken = require('../../getToken');
const fetch = require("node-fetch");
const productURL = 'https://qa.planogram.demingrobotics.com/product/';

//PRODUCT

//Post
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
async function deleteProduct(token, id) {
    const response = await fetch(productURL + id, {
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
// get deleted id => no function required for this

module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct
}