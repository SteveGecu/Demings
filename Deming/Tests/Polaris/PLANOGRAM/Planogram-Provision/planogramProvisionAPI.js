const getToken = require('../../getToken');
const fetch = require("node-fetch");
const planogramProvisionURL = "https://qa.planogram.demingrobotics.com/planogram-provision/";

// PLANOGRAM-PROVISION 
// POST need rail id and planogram id
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

// Get all 
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
//Get specific id
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

//patch id S
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

// delete id
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

//return deleted id => no need to write new function


module.exports = {
    createPlanogramProvision,
    getAllPlanogramProvision,
    getPlanogramProvision,
    patchPlanogramProvision,
    deletePlanogramProvision
}