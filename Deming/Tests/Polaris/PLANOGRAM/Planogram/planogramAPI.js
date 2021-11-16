const getToken = require('../../getToken');
const fetch = require("node-fetch");
const planogramUrl = 'https://qa.planogram.demingrobotics.com/planogram/';

//PLANOGRAM 

//create planogram
async function createPlanogram(token) {
    const response = await fetch(planogramUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({})
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//get planograms
async function getPlanograms(token) {
    let response = await fetch(planogramUrl, {
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

//get planogram with a specific id
async function getPlanogram(token, planogramId) {
    let response = await fetch(planogramUrl + planogramId, {
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

// update planogram
async function updatePlanogram(token, planogramId) {
    let response = await fetch(planogramUrl + planogramId, {
        method: 'PATCH',
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

// delete function for planogram
async function deletePlanogram(planogramId) {
    const response = await fetch(planogramUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ planogramId }`
        },
        body: JSON.stringify({ planogramId })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }

}

module.exports = {
    createPlanogram,
    getPlanograms,
    getPlanogram,
    updatePlanogram,
    deletePlanogram
}
