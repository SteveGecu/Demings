const getToken = require('../../getToken');
const fetch = require("node-fetch");
const railURL ='https://qa.provisioning.demingrobotics.com/rail';


async function createRail(token){
    const response = await fetch(railURL, {
        method:'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        }, 
        body: JSON.stringify({
            "id": "",
            "aisleId": 6,
            "contextId": "auto-generated",
            "description": "auto-generated"
      })
    })
    return {
      body: await response.json(),
      status: response.status,
      headers: response.statusText
  }}

async function getRails(token){
    const response = await fetch(railURL, {
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

async function getRail(token, id){
    const response = await fetch(railURL + "/" + id, {
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

async function updateRail(token, id){
    const response = await fetch(railURL + "/" + id, {
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

async function deleteRail(token, id){
    const response = await fetch(railURL + "/" + id, {
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
   createRail,
   getRails,
   getRail,
   updateRail,
   deleteRail
}