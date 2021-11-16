const getToken = require('../../getToken');
const fetch = require("node-fetch");
const customerURL = 'https://rangr-api.deming.qa.eastus2.spacee.io/customer';

//create planogram
async function createCustomer(token) {
    const response = await fetch(customerURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({
            "customerId": 100,
            "name": "Oz"
        })
    })

    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}



module.exports = {
   createCustomer
}