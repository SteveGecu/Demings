const getToken = require('../../getToken');
const fetch = require("node-fetch");
const planogramProvisionURL = "https://qa.planogram.demingrobotics.com/planogram-provision/";

async function createPlanogramProvision(token) {
    const response = await fetch(planogramProvisionURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`     
        },
        body: JSON.stringify({
            'railId': '5C86F287-AF14-4ECB-8EDE-EA762397D9C3',
            'planogramId':0
        })
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headersThis 
    }
}
async function getAllPlanogramProvision(token) {
    let response = await fetch(planogramProvisionURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    });

    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}
async function getPlanogramProvision(token, id) {
    let response = await fetch(planogramProvisionURL + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    });
    return {
        body: await response.json(),
        status: response.status,
        headers: response.headers
    }
}
async function patchPlanogramProvision(token, id) {
    const response = await fetch(planogramProvisionURL + id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function deletePlanogramProvision(token,id) {
    const response = await fetch(planogramProvisionURL +id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

module.exports = {
    createPlanogramProvision,
    getAllPlanogramProvision,
    getPlanogramProvision,
    patchPlanogramProvision,
    deletePlanogramProvision
}