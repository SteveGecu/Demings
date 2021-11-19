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
//get aisle 
//update aisle
//delete aisle

module.exports = {
   createAisle
}