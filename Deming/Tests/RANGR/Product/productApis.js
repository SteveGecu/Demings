const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createProduct(productName, categoryId) {
    let response = await fetch(rangerApiURL + "/product", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": productName,
            "sku": "test sku",
            "thumbnail": "87d1c3b7-e27e-40aa-8296-0c729318de7b",
            "retailPrice": 0,
            "upc": 0,
            "caseQty": 0,
            "weight": 0,
            "categoryId": categoryId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getProducts() {
    let response = await fetch(rangerApiURL + "/product", {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getProduct(ProductId) {
    let response = await fetch(rangerApiURL + "/product/" + ProductId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateProduct(ProductId, newProductName) {
    let response = await fetch(rangerApiURL + "/product/" + ProductId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": newProductName,
            "sku": "test sku",
            "thumbnail": "FEF52E45-916E-4A06-B0E0-1533FBFD7C1E",
            "retailPrice": 0,
            "upc": 0,
            "caseQty": 0,
            "weight": 0,
            "categoryId": ProductId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteProduct(ProductId) {
    let response = await fetch(rangerApiURL + `/product/${ ProductId }`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}