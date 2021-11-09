const axios = require('axios').default;
const jest = require('jest')

const token = 'eyJraWQiOiJRVEZqTEZTYjZOUHY4WGU0LWRDN2E0V2NTYUZLWml3VVdhcUo1ZWJtcWd3IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnRUMDJMa2Y1b21YM1k4WlhSazBRTDRiYWh4VHhUdDVDRDVmWE81ZkkyVGsiLCJpc3MiOiJodHRwczovL3NwYWNlZS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MzY0OTQxODcsImV4cCI6MTYzNjU4MDU4NywiY2lkIjoiMG9hYWx3azhlNHV6Q21SOEQzNTciLCJzY3AiOlsic3RvcmVzIl0sInN1YiI6IjBvYWFsd2s4ZTR1ekNtUjhEMzU3In0.bn8jUU1B-ArfWp9tAkpYB141epfpcF5Q2A9l4FCTrxp8s4IKK9-lL_rXAEQRqqM5PsWx1_R3nWYYC_ZTkWNyDrLFws-3UGIDzJETUljscvbtG9djOR9mf36i-B7xCVGyVkTsNdNv0mCyN4zEwumCQ2GYwL9kNWjTARlgBbvALhvdEA-go5taqRDUjLRlDJlQ4YX01gKwgvQOWtbqeiw_BiYY7nx1YmZi82R-x7TMZVV9UYS4R3kqFG01YIXtwOf1LDciG7Il_q7V15lp_t29I9a_HSMrOZvn8cqeS5ZsThMjWX1SU6JEaz-1ANTHA1_fudnK5y2Dv3TWJ_BQtCcK9Q'

const env = process.env.ENV
const storeId = process.env.STORE_ID;
const customerId = process.env.CUSTOMER_ID;
const observrRails = (process.env.OBSERVR_RAILS || '').split(',');
const provisioningBaseUrl = `https://${env}.provisioning.demingrobotics.com/`
const sisBaseUrl = `https://shared.${env}.eastus2.deming.spacee.io/`

async function getDrones(storeId) {
    const provisioningRequests = axios.create({
        baseURL: provisioningBaseUrl
    });

    provisioningRequests.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response = await provisioningRequests.get(`/drone-provision?storeId=${storeId}`)

    if(response.status != 200) {
        return Promise.reject(`Unable to retrieve drones for store ${storeId} from ${provisioningUrl}.  Received ${response.status} instead of expected 200.`)
    }

    return response.data;
}


async function getDNN(drone) {
    let response = null;
    try {
        response = await axios.get(`${sisBaseUrl}api/v1/dnn/provision?railId=${drone.railId}`);
        return response.data.DnnId;
      } catch (err) {
        if (err.response) {
           console.log(`Unable to retrieve DNN for rail ${drone.railId} at store ${storeId} from ${sisBaseUrl}.  Received ${err.response.status} instead of expected 200.`)
        }
      }
    return null;
}


function _distinct(value, index, self) {
  return self.indexOf(value) === index;
}

function _setEnvironmentVariables(drone) {
  process.env[`${drone.droneType}CUSTOMERID`] = customerId;
  process.env[`${drone.droneType}STOREID`] = storeId;
  process.env[`${drone.droneType}DSN`] = drone.dsn;
  process.env[`${drone.droneType}RAIL_ID`] = drone.railId;
  process.env[`${drone.droneType}DNN`] = drone.dnn;
  process.env[`${drone.droneType}PRODUCTFACINGIDONE`] = 486;
  process.env[`${drone.droneType}PRODUCTFACINGIDTWO`] = 487;

  process.env['ELASTIC_URL'] = `https://7ea136898a864522af7be4a25f161508.eastus2.azure.elastic-cloud.com:9243/${env}/_search`
  process.env['ROVRDNNAPI'] = `https://shared-${env}-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=`
  process.env['ROVRDNNIDAPI'] = `https://shared.${env}.eastus2.deming.spacee.io/api/v1/dnn/provision?productMapId=`
  process.env['ROVRFACINGAPI'] = `https://shared.${env}.eastus2.deming.spacee.io/api/v1/rail/`
  process.env['OBSERVRDNNAPI'] = `https://shared-${env}-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=`
  process.env['OBSERVRDNNFACINGAPI'] = `https://shared.${env}.eastus2.deming.spacee.io/api/v1/rail/`
}

async function runDroneTest(drone) {
  let report = Object.assign({}, drone);

  if(!drone.dnn) {
    report.isTested = false;
    return report;
  }

  report.isTested = true;
  report.testSummary = {};

  _setEnvironmentVariables(drone);
  
  config = {
    silent: true,
    json: true,
    useStderr: false,
    displayName: `${drone.droneType} - ${drone.dsn}`,
    roots: [`./Deming/Tests/${drone.droneType}/`]
  }

  let result = await jest.runCLI(config, config.roots);

  report.testSummary.isSuccess = true;
  report.testSummary.totalTests = result.results.numTotalTests;
  report.testSummary.passedTests = result.results.numPassedTests;
  report.testSummary.failedTests = result.results.numFailedTests;
  report.testSummary.failingSuites = [];

  let failingSuites = [];
  result.results.testResults.forEach(lvl1 => {
    if(lvl1.numFailingTests > 0) {
      lvl1.testResults.forEach(tr => {
        tr.ancestorTitles.forEach(x => {
          failingSuites.push(x);
        });
      });
    }
  });
  report.testSummary.failingSuites = failingSuites.filter(_distinct);
  
  return report
}


(async() => {
    let drones = await getDrones(storeId);
    let report = {
      summary: {
        totalDrones: drones.length,
        testedDrones: 0,
        skippedDrones: 0
      },
      testResults: []
    };

    for (let key in drones) {
        let drone = drones[key];
        let droneType = drone.railId in observrRails ? 'OBSERVR' : 'ROVR';
        drones[key].droneType = droneType;
        drones[key].dnn = await getDNN(drone);
        
        let testReport = await runDroneTest(drone);
        if(testReport.isTested) {
          report.summary.testedDrones++;
        } else {
          report.summary.skippedDrones++;
        }
        report.testResults.push(testReport);
    }

    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    console.log('########################################################################################');
    console.log(report);
    console.log('########################################################################################');
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
})();

  // FACING ID ???
  // EVALUATE RESULTS
  // SEND SLACK MESSAGE
