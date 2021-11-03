const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createCostumer(customerId, customerName) {
    let response = await fetch(rangerApiURL + "/customer", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "customerId": customerId,
            "name": customerName
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getCustomers() {
    let response = await fetch(rangerApiURL + "/customer", {
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

async function getCustomer(customerId) {
    let response = await fetch(rangerApiURL + "/customer/" + customerId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateCostumer(customerId, customerName) {
    let response = await fetch(rangerApiURL + "/customer/" + customerId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": customerName
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteCustomer(costumerId) {
    let response = await fetch(rangerApiURL + `/customer/${ costumerId }`, {
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
    createCostumer,
    getCustomers,
    getCustomer,
    updateCostumer,
    deleteCustomer
}