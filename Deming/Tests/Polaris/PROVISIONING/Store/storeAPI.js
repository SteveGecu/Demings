const getToken = require('../../getToken');
const fetch = require("node-fetch");
const storeURL ='https://qa.provisioning.demingrobotics.com/store';


//create store

async function createStore(token){
  const response = await fetch(storeURL, {
      method:'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }, 
      body: JSON.stringify({
        "id": 0,
        "storeCode": 0,
        "name": "string",
        "address": "string",
        "city": "string",
        "state": "string",
        "postalCode": "string",
        "customerId": 1001
    })
  })
  return {
    body: await response.json(),
    status: response.status,
    headers: response.statusText
}}
//get all stores
async function getStores(token){
    const response = await fetch(storeURL, {
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

//get the store

async function getStore(token, id){
    const response = await fetch(storeURL + "/" + id, {
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

//update store
async function updateStore(token, id){
    const response = await fetch(storeURL + "/" + id, {
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

//delete store
async function deleteStore(token, id){
    const response = await fetch(storeURL + "/" + id, {
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
    createStore,
    getStores,
    getStore,
    updateStore,
    deleteStore
}