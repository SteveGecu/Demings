const getToken = require('../../getToken');
const fetch = require("node-fetch");
const droneProvisionURL ='https://qa.provisioning.demingrobotics.com/drone-provision';

async function createDroneProvision(token){
    const response = await fetch(droneProvisionURL, {
        method:'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        }, 
        body: JSON.stringify({
            "railId": "EAF44C72-A021-4A97-8F1E-FDE9FDDD6AF3",
            "dsn": "001f7b3b4cf8"
      })
    })
    return {
      body: await response.json(),
      status: response.status,
      headers: response.statusText
  }}

async function getDroneProvisions(token){
    const response = await fetch(droneProvisionURL, {
        method:'GET',
        headers:{
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

async function getDroneProvision(token,id){
    const response = await fetch(droneProvisionURL + "/" + id, {
        method:'GET',
        headers:{
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

async function updateDroneProvision(token, id){
    const response = await fetch(droneProvisionURL + "/" + id, {
        method:'PATCH',
        headers:{
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

async function deleteDroneProvision(token, id){
    const response = await fetch(droneProvisionURL + "/" + id, {
        method:'DELETE',
        headers:{
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
    createDroneProvision,
    getDroneProvisions,
    getDroneProvision,
    updateDroneProvision,
    deleteDroneProvision
 }