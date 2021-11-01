//variables
const rangerApiURL = "https://rangr-api.deming.qa.eastus2.spacee.io";
const fetch = require("node-fetch");


//functions
//get healthz
async function getHealthZ() {
    let response = await fetch(rangerApiURL + "/healthz", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get provison
async function getProvison() {
    let response = await fetch(rangerApiURL + "/provision", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
        return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}


//get customers

async function getCustomers() {
    let response = await fetch(rangerApiURL + "/customer", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get customer

async function getCustomer() {
    let response = await fetch(rangerApiURL + "/customer/10", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get stores

async function getStores() {
    let response = await fetch(rangerApiURL + "/store", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get store
async function getStore() {
    let response = await fetch(rangerApiURL + "/store/10", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get devices
async function getDevices() {
    let response = await fetch(rangerApiURL + "/device", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get device
async function getDevice() {
    let response = await fetch(rangerApiURL + "/device/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get device dsn
async function getDeviceDSN() {
    let response = await fetch(rangerApiURL + "/device/dsn/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get area
async function getArea() {
    let response = await fetch(rangerApiURL + "/area", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get area id
async function getAreaId() {
    let response = await fetch(rangerApiURL + "/area/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get location
async function getLocation() {
    let response = await fetch(rangerApiURL + "/location", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get location id
async function getLocationId() {
    let response = await fetch(rangerApiURL + "/location/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get shelf-size
async function getShelf() {
    let response = await fetch(rangerApiURL + "/shelf-size", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get shelf-size id
async function getShelfId() {
    let response = await fetch(rangerApiURL + "/shelf-size/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get facings
async function getFacing() {
    let response = await fetch(rangerApiURL + "/facing", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get facings id
async function getFacingId() {
    let response = await fetch(rangerApiURL + "/facing/8D34EA9F-7C0A-EC11-981F-2818783F8227", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get category
async function getCategory() {
    let response = await fetch(rangerApiURL + "/category", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get category id
async function getCategoryId() {
    let response = await fetch(rangerApiURL + "/category/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get product
async function getProduct() {
    let response = await fetch(rangerApiURL + "/product", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get product id
async function getProductId() {
    let response = await fetch(rangerApiURL + "/product/0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//get product-provision id
async function getProductProvision() {
    let response = await fetch(rangerApiURL + "/product-provision", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return {
        body: response.json(),
        status: response.status,
        headers: response.headers
    }
}

//export module
module.exports = {
  getHealthZ,
  getProvison,
  getCustomers,
  getCustomer,
  getStores,
  getStore,
  getDevices,
  getDevice,
  getDeviceDSN,
  getArea,
  getAreaId,
  getLocation,
  getLocationId,
  getShelf,
  getShelfId,
  getFacing,
  getFacingId,
  getCategory,
  getCategoryId,
  getProduct,
  getProductId,
  getProductProvision
}