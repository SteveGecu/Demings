const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createArea(name) {
    let response = await fetch(rangerApiURL + "/area", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getAreas() {
    let response = await fetch(rangerApiURL + "/area", {
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

async function getArea(areaId) {
    let response = await fetch(rangerApiURL + "/area/" + areaId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateArea(areaId, newName) {
    let response = await fetch(rangerApiURL + "/area/" + areaId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": newName
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteArea(areaId) {
    let response = await fetch(rangerApiURL + `/area/${ areaId }`, {
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
    createArea,
    getAreas,
    getArea,
    updateArea,
    deleteArea
}