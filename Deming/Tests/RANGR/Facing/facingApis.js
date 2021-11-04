const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createFacing(section, shelf, position, storeId, locationId, shelfSizeId) {
    let response = await fetch(rangerApiURL + "/facing", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "section": section,
            "shelf": shelf,
            "position": position,
            "storeId": storeId,
            "locationId": locationId,
            "shelfSizeId": shelfSizeId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getFacings() {
    let response = await fetch(rangerApiURL + "/facing", {
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

async function getFacing(facingId) {
    let response = await fetch(rangerApiURL + "/facing/" + facingId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateFacing(facingId) {
    let response = await fetch(rangerApiURL + "/facing/" + facingId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "section": 1,
            "shelf": 1,
            "position": 4,
            "storeId": 4,
            "locationId": 1,
            "shelfSizeId": 1
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteFacing(facingId) {
    let response = await fetch(rangerApiURL + `/facing/${ facingId }`, {
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
    createFacing,
    getFacings,
    getFacing,
    updateFacing,
    deleteFacing
}