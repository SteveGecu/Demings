const getToken = require('../../getToken');
const fetch = require("node-fetch");
const aisleURL ='https://qa.provisioning.demingrobotics.com/aisle';

//create aisle - use store id 123
async function createAisle(token){
    const response = await fetch(aisleURL, {
        method:'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        }, 
        body: JSON.stringify({
            "label": "string",
            "storeId": 123
      })
    })
    return {
      body: await response.json(),
      status: response.status,
      headers: response.statusText
  }}
//get aisles
async function getAisles(token){
    const response = await fetch(aisleURL, {
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
//get aisle 
async function getAisle(token, id){
    const response = await fetch(aisleURL + "/" + id, {
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
//update aisle
async function updateAisle(token, id){
    const response = await fetch(aisleURL + "/" + id, {
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
//delete aisle
async function deleteAisle(token, id){
    const response = await fetch(aisleURL + "/" + id, {
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
   createAisle,
   getAisles,
   getAisle,
   updateAisle,
   deleteAisle
}