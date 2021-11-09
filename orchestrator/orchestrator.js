const axios = require('axios').default;
const jest = require('jest')

const token = 'eyJraWQiOiJRVEZqTEZTYjZOUHY4WGU0LWRDN2E0V2NTYUZLWml3VVdhcUo1ZWJtcWd3IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnRUMDJMa2Y1b21YM1k4WlhSazBRTDRiYWh4VHhUdDVDRDVmWE81ZkkyVGsiLCJpc3MiOiJodHRwczovL3NwYWNlZS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MzY0OTQxODcsImV4cCI6MTYzNjU4MDU4NywiY2lkIjoiMG9hYWx3azhlNHV6Q21SOEQzNTciLCJzY3AiOlsic3RvcmVzIl0sInN1YiI6IjBvYWFsd2s4ZTR1ekNtUjhEMzU3In0.bn8jUU1B-ArfWp9tAkpYB141epfpcF5Q2A9l4FCTrxp8s4IKK9-lL_rXAEQRqqM5PsWx1_R3nWYYC_ZTkWNyDrLFws-3UGIDzJETUljscvbtG9djOR9mf36i-B7xCVGyVkTsNdNv0mCyN4zEwumCQ2GYwL9kNWjTARlgBbvALhvdEA-go5taqRDUjLRlDJlQ4YX01gKwgvQOWtbqeiw_BiYY7nx1YmZi82R-x7TMZVV9UYS4R3kqFG01YIXtwOf1LDciG7Il_q7V15lp_t29I9a_HSMrOZvn8cqeS5ZsThMjWX1SU6JEaz-1ANTHA1_fudnK5y2Dv3TWJ_BQtCcK9Q'

const Env = process.env.ENV
const StoreId = process.env.STORE_ID;
const CustomerId = process.env.CUSTOMER_ID;
const ObservrRails = (process.env.OBSERVR_RAILS || '').split(',');
const ProvisioningBaseUrl = `https://${Env}.provisioning.demingrobotics.com/`
const SISBaseUrl = `https://shared.${Env}.eastus2.deming.spacee.io/`
const SlackWebHookUrl = process.env.SLACK_WEBHOOK_URL;


// Retrieve drones from the Provisioning service based on the StoreId environment variable
async function getDrones(storeId) {
    const provisioningRequests = axios.create({
        baseURL: ProvisioningBaseUrl
    });

    provisioningRequests.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response = await provisioningRequests.get(`/drone-provision?storeId=${StoreId}`)

    if(response.status != 200) {
        return Promise.reject(`Unable to retrieve drones for store ${StoreId} from ${provisioningUrl}.  Received ${response.status} instead of expected 200.`)
    }

    return response.data;
}


// Retrieve active DNN from the Shared Inference Service based on the drone's Rail Id
async function getDNN(drone) {
    let response = null;
    try {
      response = await axios.get(`${SISBaseUrl}api/v1/dnn/provision?railId=${drone.railId}`);
      return response.data.DnnId;
    } catch (err) {
      if (err.response) {
        console.error(`Unable to retrieve DNN for rail ${drone.railId} at store ${StoreId} from ${SISBaseUrl}.  Received ${err.response.status} instead of expected 200.`)
      } else {
        console.error(`Error when trying to retrieve DNN for rail ${drone.railId} at store ${StoreId} from ${SISBaseUrl}: ${err}`);
      }
    }
    return null;
}


// Filter function for array distint values
function _distinct(value, index, self) {
  return self.indexOf(value) === index;
}


// Helper function to set environment variables per test suite execution, hopefully making these a little more discoverable
// Note that some of these variable names are dynamic based on the drone type: ROVR, OBSERVR
function _setEnvironmentVariables(drone) {
  process.env[`${drone.droneType}CUSTOMERID`] = CustomerId;
  process.env[`${drone.droneType}STOREID`] = StoreId;
  process.env[`${drone.droneType}DSN`] = drone.dsn;
  process.env[`${drone.droneType}RAIL_ID`] = drone.railId;
  process.env[`${drone.droneType}DNN`] = drone.dnn;
  process.env[`${drone.droneType}PRODUCTFACINGIDONE`] = 486;
  process.env[`${drone.droneType}PRODUCTFACINGIDTWO`] = 487;

  process.env['ELASTIC_URL'] = `https://7ea136898a864522af7be4a25f161508.eastus2.azure.elastic-cloud.com:9243/${Env}/_search`
  process.env['ROVRDNNAPI'] = `https://shared-${Env}-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=`
  process.env['ROVRDNNIDAPI'] = `https://shared.${Env}.eastus2.deming.spacee.io/api/v1/dnn/provision?productMapId=`
  process.env['ROVRFACINGAPI'] = `https://shared.${Env}.eastus2.deming.spacee.io/api/v1/rail/`
  process.env['OBSERVRDNNAPI'] = `https://shared-${Env}-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=`
  process.env['OBSERVRDNNFACINGAPI'] = `https://shared.${Env}.eastus2.deming.spacee.io/api/v1/rail/`
}


// Execute the test suite for a given drone
// Parse the output (very verbose) the details we care about and return them as a 'report' object
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


// Send slack alert to channel based on environment variable
async function sendSlackAlert(report) {
  if(!SlackWebHookUrl) { return; }

  let body = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${Env} Automation Alert`
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Failed Tests:*\n${report.summary.skippedDrones}`
          },
          {
            type: "mrkdwn",
            text: `*Total Tests:*\n${report.summary.testedDrones}`
          }
          {
            type: "mrkdwn",
            text: `*Total Drones:*\n${report.summary.totalDrones}`
          }
        ]
      }
    ]
  };

  let response = await axios.post(SlackWebHookUrl, body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


// Main function to handle the workflow
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
        let droneType = drone.railId in ObservrRails ? 'OBSERVR' : 'ROVR';
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

    await sendSlackAlert(report);
})();

  // FACING ID ???
  // EVALUATE RESULTS
  // SEND SLACK MESSAGE
