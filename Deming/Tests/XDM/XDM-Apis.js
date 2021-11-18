const XDMurl = 'https://xdm-api.sense.dev.eastus2.spacee.io'
const fetch = require("node-fetch");

async function getComponent(token) {
    const response = await fetch(XDMurl + "/component", {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': '*/*',
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
    getComponent
}