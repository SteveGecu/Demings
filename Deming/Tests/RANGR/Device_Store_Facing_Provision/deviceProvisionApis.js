const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createProvision(storeId, dsn, facingId) {
    let response = await fetch(rangerApiURL + "/provision", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "storeId": storeId,
            "deviceSerialNumber": dsn,
            "facingId": facingId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getProvisions() {
    let response = await fetch(rangerApiURL + "/provision", {
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

async function deleteProvision(deviceProvisionId) {
    let response = await fetch(rangerApiURL + `/provision/${ deviceProvisionId }`, {
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
    createProvision,
    getProvisions,
    deleteProvision
}