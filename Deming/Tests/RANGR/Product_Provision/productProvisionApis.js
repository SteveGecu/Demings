const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createProductProvision(productId, facingId) {
    let response = await fetch(rangerApiURL + "/product-provision", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "productId": productId,
            "facingId": facingId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getProductProvisions() {
    let response = await fetch(rangerApiURL + "/product-provision", {
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

async function deleteProductProvosion(productProvisionId) {
    let response = await fetch(rangerApiURL + `/product-provision/${ productProvisionId }`, {
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
    createProductProvision,
    getProductProvisions,
    deleteProductProvosion
}