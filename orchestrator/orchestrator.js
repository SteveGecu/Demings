const axios = require('axios').default;
const jest = require('jest');
const stdout = require('mute-stdout');
const qs = require('qs');
const fs = require('fs');

const OktaBaseUrl = 'https://spacee.okta.com/';
const OKTA_CLIENT_ID = '0oaalwk8e4uzCmR8D357';
const OKTA_CLIENT_SECRET = 'aDtPC4o2NtglSyy6_RAcP4ef4fMYpQ2UPOII7AIf';

const Env = process.env.ENV
const StoreId = process.env.STORE_ID;
const CustomerId = process.env.CUSTOMER_ID;
const observrRailKey = `OBSERVR_RAILS_${CustomerId}_${StoreId}`
const ObservrRails = (process.env[observrRailKey] || '').split(',');
const ProvisioningBaseUrl = `https://${Env}.provisioning.demingrobotics.com/`
const SISBaseUrl = `https://shared.${Env}.eastus2.deming.spacee.io/`
const SlackWebHookUrl = process.env.SLACK_WEBHOOK_URL;
const NotificationType = process.env.NOTIFICATION_TYPE;
const PipelineId = process.env.CI_PIPELINE_ID || '';


// Retreive Okta access token for use with Provisioning service
async function getOktaToken() {
  const oktaRequests = axios.create({
      baseURL: OktaBaseUrl
  });
  oktaRequests.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

  let body = {
    grant_type: 'client_credentials',
    scope: 'stores',
    client_id: OKTA_CLIENT_ID,
    client_secret: OKTA_CLIENT_SECRET
  };
  let response = await oktaRequests.post('/oauth2/default/v1/token', qs.stringify(body));
  return response.data.access_token;
};


// Retrieve drones from the Provisioning service based on the StoreId environment variable
async function getDrones(storeId) {
  let oktaToken = await getOktaToken();
  const provisioningRequests = axios.create({
      baseURL: ProvisioningBaseUrl
  });

  provisioningRequests.defaults.headers.common['Authorization'] = `Bearer ${oktaToken}`;
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


// Helper function to set environment variables per test suite execution, hopefully making these a little more discoverable
// Note that some of these variable names are dynamic based on the drone type: ROVR, OBSERVR
function _setEnvironmentVariables(drone) {
  process.env[`${drone.droneType}CUSTOMERID`] = CustomerId;
  process.env[`${drone.droneType}STOREID`] = StoreId;
  process.env[`${drone.droneType}DSN`] = drone.dsn;
  process.env[`${drone.droneType}RAIL_ID`] = drone.railId;
  process.env[`${drone.droneType}DNN`] = drone.dnn;

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
  delete report.id;
  delete report.createdAt;

  // if the drone doesn't have a dnn skip the test
  if(!drone.dnn) {
    report.isTested = false;
    return report;
  }

  _setEnvironmentVariables(drone);
  
  jestConfig = {
    silent: true,
    json: true,
    useStderr: false,
    displayName: `${drone.droneType} - ${drone.dsn}`,
    // outputFile: `${drone.droneType}_${drone.dsn}_junit.xml`,
    roots: [`./Deming/Tests/${drone.droneType}/`]
  }

  stdout.mute();
  let result = await jest.runCLI(jestConfig, jestConfig.roots);
  stdout.unmute();

  report.isTested = true;
  report.totalTests = result.results.numTotalTests;
  report.totalPassedTests = result.results.numPassedTests;
  report.totalFailedTests = result.results.numFailedTests;

  report.failures = {};
  result.results.testResults.forEach(lvl1 => {
    if(lvl1.numFailingTests > 0) {
      lvl1.testResults.forEach(tr => {
        let suite = tr.ancestorTitles.pop();
        if(!report.failures[suite]) { report.failures[suite] = []; }
        report.failures[suite].push(tr.title);
      });
    }
  });

  // rename the junit xml file so that drone test executions can be referenced individually
  fs.renameSync('./junit.xml', `./${drone.droneType}_${drone.dsn}_junit.xml`);
  
  return report;
}


// Search drone failures for a partular test case.  If any drones failed the test case, construct the alert message
function _getAlertByFailedTest(report, severity, testMatch) {
  testMatch = testMatch.toLowerCase();
  let failedDrones = [];

  report.drones.forEach(drone => {
    // don't bother looking if drone was skipped or if all tests were passed
    if (!drone.isTested || drone.totalFailedTests == 0) { return; }

    console.log(`EVALUATING DRONE ${drone.dsn}`);
    let failedTest = false;
    for(suite in drone.failures) {
      let cnt = drone.failures[suite].filter(tst => { return tst.toLowerCase().indexOf(testMatch) !== -1; }).length;
      if(cnt) { failedTest = true; }
    }

    console.log(`FAILED TEST: ${failedTest}`);

    if(failedTest) {
      failedDrones.push(drone.dsn);
    }
  });

  console.log(`FOUND ${failedDrones.length} drones that failed test ${testMatch}`);
  
  if(failedDrones.length > 0) {
    let alert = {
      severity: severity,
      message: `The following ${failedDrones.length} drones failed the test '${testMatch}':\n`
    };
    failedDrones.forEach(dsn => alert.message += `\n - ${dsn}`);
    return alert;
  }

  return null;
}


// The rules for sending alerts, right now this is just a boolean response but
// this could be changed to an object to determine serverity, etc
// Seperating this into it's own function because it may get rather large/complex as we build the rules
function _evaluateReport(report) {
  let alerts = [];

  // alert if any drone are skipped, this can be addressed the next day
  if (report.summary.skippedDrones > 0) {
    let alert = {
      severity: 'P3',
      message: `The following ${report.summary.skippedDrones} drones were skipped due to not having an assigned DNN:`
    };
    report.drones.filter(d => !d.dnn).forEach(d => alert.message += `\n   - ${d.dsn}`);
    alerts.push(alert);
  }

  let temperatureAlert = _getAlertByFailedTest(report, 'P3', 'Temperature value should be lower then 85');
  if(temperatureAlert) {
    alerts.push(temperatureAlert);
  }

  return alerts;
}


// Send slack alert to channel based on environment variable
async function sendSlackAlert(webhookUrl, report) {
  let alerts = _evaluateReport(report);
  if(!alerts.length) { return; }

  let body = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${Env.toUpperCase()} Automation Alert`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Drones:*\n${report.summary.totalDrones}`
          },
          {
            type: 'mrkdwn',
            text: `*Passed Tests:*\n${report.summary.totalPassedTests}/${report.summary.totalDroneTests}`
          }
        ]
      },
    ]
  };

  alerts.forEach(alrt => 
    body.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${alrt.severity} Alert*:\n${alrt.message}`
      }
    })
  );

  console.log(JSON.stringify(body));
  await axios.post(webhookUrl, body);
}

async function sendSlackReport(webhookUrl, report) {
  let alerts = _evaluateReport(report);
  let testSummaryUrl = PipelineId ? `<https://gitlab.com/spacee/deming/rovr-proj/gateway/test-suite-automation/-/pipelines/${PipelineId}/test_report|${PipelineId}>` : '**Not Available**';
  let overallStatus = report.summary.totalFailedTests == 0 ? 'Success' : 'Failure';

  let body = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${Env.toUpperCase()} Test Automation`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Overall Status:*\n ${overallStatus}`
          },
          {
            type: 'mrkdwn',
            text: `*Environment:*\n${Env}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Test Summary:*\n`
          },
          {
            type: 'mrkdwn',
            text: `*Execution Time:*\n${report.summary.durationSeconds} sec`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Drones:*\n${report.summary.totalDrones}`
          },
          {
            type: 'mrkdwn',
            text: `*Skipped Drones:*\n${report.summary.skippedDrones}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Tests:*\n${report.summary.totalDroneTests}`
          },
          {
            type: 'mrkdwn',
            text: `*Errors:*\n${report.summary.totalFailedTests}`
          }
        ]
      }
    ]
  };

  if(alerts.length) {
    alertBlock = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Critical Alerts*:'
      }
    };

    alerts.forEach(alrt => alertBlock.text.text += `\n${alrt.message}`);
    body.blocks.push(alertBlock);
  }

  console.log(JSON.stringify(body));
  await axios.post(webhookUrl, body);
}

// Main function to handle the workflow
(async() => {
  let drones = await getDrones(StoreId);
  
  let report = {
    summary: {
      totalDrones: drones.length,
      testedDrones: 0,
      skippedDrones: 0,
      totalDroneTests: 0,
      totalPassedTests: 0,
      totalFailedTests: 0
    },
    drones: []
  };

  let start = Date.now();
  for (let key in drones) {
    let drone = drones[key];

    if(!['72BB78CB-9CF5-475F-B568-FA0AFD3F6C5C','0739633A-0C07-4188-90B5-356D0EEAB88D'].includes(drone.railId)) {
      continue;
    }

    let droneType = ObservrRails.includes(drone.railId) ? 'OBSERVR' : 'ROVR';
    drones[key].droneType = droneType;
    drones[key].dnn = await getDNN(drone);
    
    let droneTestReport = await runDroneTest(drone);
    if(droneTestReport.isTested) {
      report.summary.testedDrones++;
      report.summary.totalDroneTests  += droneTestReport.totalTests;
      report.summary.totalPassedTests += droneTestReport.totalPassedTests;
      report.summary.totalFailedTests += droneTestReport.totalFailedTests;
    } else {
      report.summary.skippedDrones++;
    }
    report.drones.push(droneTestReport);
  }
  let end = Date.now();
  report.summary.durationSeconds = Math.round((end - start) / 100) / 10;

  // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  // console.log('########################################################################################');
  // console.info(report.summary);
  // report.drones.forEach(x => {
  //   console.log(x);
  // });
  // console.log('########################################################################################');
  // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  // console.log(JSON.stringify(report));


  if(!SlackWebHookUrl) { 
    console.log('SLACK_WEBHOOK_URL is not configured');
    return; 
  }

  if(NotificationType == 'ALERT') {
    await sendSlackAlert(SlackWebHookUrl, report);
  } else {
    await sendSlackReport(SlackWebHookUrl, report);
  }
})();
