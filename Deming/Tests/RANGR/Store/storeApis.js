const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createStore(storeId, customerId) {
    let response = await fetch(rangerApiURL + "/store", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "storeId": storeId,
            "code": "123",
            "description": "Spacee Store",
            "address": "3752 Arapaho Rd",
            "city": "Addison",
            "state": "TX",
            "postalCode": "75001",
            "customerId": customerId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getStores() {
    let response = await fetch(rangerApiURL + "/store", {
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

async function getStore(storeId) {
    let response = await fetch(rangerApiURL + "/store/" + storeId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateStore(storeId) {
    let response = await fetch(rangerApiURL + "/store/" + storeId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": "123",
            "description": "Spacee Store 2",
            "address": "3752 Arapaho Rd",
            "city": "Addison",
            "state": "TX",
            "postalCode": "75001"
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteStore(storeId) {
    let response = await fetch(rangerApiURL + `/store/${ storeId }`, {
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
    createStore,
    getStores,
    getStore,
    updateStore,
    deleteStore
}