const getToken = require('../../getToken');
const fetch = require("node-fetch");
const sticthedImageURL = "https://qa.planogram.demingrobotics.com/stitched-image";
const { fileURLToPath } = require('url');
let fileLocation = fileURLToPath('file:///Users/osman/Desktop/hey.txt');

//STITCHED-IMAGE
//upload the image //
async function createStitchImage(token){
    const response = await fetch(sticthedImageURL + "/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify({ 
            "myFile": fileLocation
         })
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//get stitched image
async function getSticthedImage(token) {
    const response = await fetch(sticthedImageURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

//download - no need a function

//delete
async function deleteImage(token, fileName){
    let response = await fetch(sticthedImageURL + '/' + fileName, {
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
        headers: response.headers
    }
}

module.exports = {
    createStitchImage,
    getSticthedImage,
    deleteImage
}
