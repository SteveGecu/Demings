const getToken = require('../../getToken');
const fetch = require("node-fetch");
//const customerURL = 'https://rangr-api.deming.qa.eastus2.spacee.io/customer';
const customerURL = 'https://qa.provisioning.demingrobotics.com/customer';



async function createCustomer(token) {
    const response = await fetch(customerURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({
            "name": "string"
        })
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getCustomers(token){
    const response = await fetch(customerURL, {
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

async function getCustomer(token, id){
    const response = await fetch(customerURL + "/" + id , {
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
    return {
        body:  await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function updateCustomer(token,id){
    const response = await fetch(customerURL + "/" + id, {
        method:'PATCH',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({
            "customerId": '000000',
            "name": "Oz"
        })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function deleteCustomer(token,id){
    const response = await fetch(customerURL + "/" + id, {
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
   createCustomer,
   getCustomers,
   getCustomer,
   updateCustomer,
   deleteCustomer
}