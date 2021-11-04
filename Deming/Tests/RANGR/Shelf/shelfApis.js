const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createShelf(depthSize, emptyDistanceSize) {
    let response = await fetch(rangerApiURL + "/shelf-size", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "depth": depthSize,
            "emptyDistance": emptyDistanceSize
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getShelfs() {
    let response = await fetch(rangerApiURL + "/shelf-size", {
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

async function getShelf(shelfSizeId) {
    let response = await fetch(rangerApiURL + "/shelf-size/" + shelfSizeId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateShelf(shelfSizeId, depthSize, emptyDistanceSize) {
    let response = await fetch(rangerApiURL + "/shelf-size/" + shelfSizeId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "depth": depthSize,
            "emptyDistance": emptyDistanceSize
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteShelf(shelfSizeId) {
    let response = await fetch(rangerApiURL + `/shelf-size/${ shelfSizeId }`, {
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
    createShelf,
    getShelfs,
    getShelf,
    updateShelf,
    deleteShelf
}