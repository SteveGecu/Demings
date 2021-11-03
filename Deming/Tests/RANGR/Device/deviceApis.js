const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");

async function createDevice(serialNumber) {
    let response = await fetch(rangerApiURL + "/device", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "serialNumber": serialNumber,
            "secret": "",
            "itemStockLevelId": "fef52e45-916e-4a06-b0e0-1533fbfd7c1e",
            "status": ""
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getDevices() {
    let response = await fetch(rangerApiURL + "/device", {
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

async function getDevice(deviceId) {
    let response = await fetch(rangerApiURL + "/device/" + deviceId, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function getDeviceWithDsn(dsn) {
    let response = await fetch(rangerApiURL + "/device/dsn/" + dsn, {
        method: 'GET'
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function updateDevice(dsn) {
    let response = await fetch(rangerApiURL + "/device/dsn/" + dsn, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "secret": "",
            "itemStockLevelId": "fef52e45-916e-4a06-b0e0-1533fbfd7c1e",
            "status": ""
        })
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}

async function deleteDevice(dsn) {
    let response = await fetch(rangerApiURL + `/device/${ dsn }`, {
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
    createDevice,
    getDevices,
    getDevice,
    getDeviceWithDsn,
    updateDevice,
    deleteDevice
}