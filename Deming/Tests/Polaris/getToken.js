const fetch = require("node-fetch")
const qs = require("qs")
const tokenUrl = 'https://spacee.okta.com/oauth2/default/v1/token'
const client_id = '0oaalwk8e4uzCmR8D357'
const client_secret = 'aDtPC4o2NtglSyy6_RAcP4ef4fMYpQ2UPOII7AIf'
const body = {
    'grant_type': 'client_credentials',
    'redirect_uri': 'http://localhost:8080/authorization-code/callback',
    'scope': 'stores',
    'client_id': '0oaalwk8e4uzCmR8D357',
    'client_secret': 'aDtPC4o2NtglSyy6_RAcP4ef4fMYpQ2UPOII7AIf'
}

async function getToken() {
    const token = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'JSESSIONID=8D822CE6B6C3A5D11FEC3844ABEA9B26'
        },
        body: qs.stringify({
            grant_type: 'client_credentials',
            redirect_uri: 'http://localhost:8080/authorization-code/callback',
            scope: 'stores',
            client_id: client_id,
            client_secret: client_secret
        })
    }
    ).then(response => response.json())

    return token.access_token
}

module.exports = {
    getToken
}