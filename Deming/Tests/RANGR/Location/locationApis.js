const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createLocation(locationDescription, locationLabel, areaId) {
    let response = await fetch(rangerApiURL + "/location", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "description": locationDescription,
            "label": locationLabel,
            "areaId": areaId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getLocations() {
    let response = await fetch(rangerApiURL + "/location", {
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

async function getLocation(locationId) {
    let response = await fetch(rangerApiURL + "/location/" + locationId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateLocation(locationId, areaId) {
    let response = await fetch(rangerApiURL + "/location/" + locationId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "description": "Updated Spacee Store",
            "label": "test label",
            "areaId": areaId
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteLocation(locationId) {
    let response = await fetch(rangerApiURL + `/location/${ locationId }`, {
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
    createLocation,
    getLocations,
    getLocation,
    updateLocation,
    deleteLocation
}