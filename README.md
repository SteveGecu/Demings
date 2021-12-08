# test-suite-automation

The repository has grown to have multiple purposes:

* Local test execution of an environment for adhoc needs
* Scheduled test execution via GitLab pipelines to provide regular test reports
* Kubernetes cron job execution on Gateway to provide operational alerting

The test suite, found in the [Deming](Deming/) directory, uses environment variables to target specific drones for validation.  Because we want to be able to test multiple drones easily, the orchestrator.js node script will call out to the *Provisioning* and *SIS* service to retrieve drone information and then it will execute the test suite per relevant drone.


## Development

1. Clone Repo
1. npm install
1. Choose environment and copy file content into .env
1. Tests are consuming data from .env file therefore .env file needs live drones data
1. Each test is able to run individually


## Test Execution


**Orchestrator Environment Variables**

* ENV - the execution environment (dev|qa|staging|prod).  In addition to logging, this is also used for determining service endpoints
* GATEWAY - the name of the gateway, used for Slack notifications
* STORE_ID - the Store Id, used when retrieving drones
* CUSTOMER_ID - the Custoner Id, used when retrieving drones
* ONLY_TEST_THESE_DSNS - *optional* if set, will limit unit test execution to only dsns in this string.
* OBSERVR_RAILS_${CustomerId}_${StoreId} - *optional* if set, will identify these rail ids as OBSERVR rails which changes the test suite that is executed
    * this should be depracated when the Provisioning service includes drone types in the response
* SLACK_WEBHOOK_URL - *optional* if set, this endpoint will be used to post Slack notifications/alerts to
* NOTIFICATION_TYPE - (ALERT|REPORT) the type of Slack message sent.  *defaults to REPORT*
* CI_PIPELINE_ID - *optional* used to provide a link to test results in REPORT notifications
* Any environment variable in the [Dockerfile](Dockerfile) can update overridden at execution as well


### Local Execution

**Dependencies**
* kcat - https://formulae.brew.sh/formula/kcat

To run the test suite locally, there are two three options:

1. Run the suite directly using npm commands defined in the [package.json] file
    * example: `npm run RovrHealthTest`
1. Run the orchestrator from you local machine
    * verify the environment variables in the [orchestrator_run.sh](orchestrator_run.sh) file
    * run `./orchestrator_run.sh` to begin execution
1. Run the orchestrator in a docker container
    * *this does not require kcat to be installed locally*
    * ensure Docker is running on you machine
    * run [Makefile](Makefile) commands:
        * Build the image: `make build `
        * Run the container: `make run`
        * OR run the container in interactive mode: `make run-it`


### GitLab Scheduled Execution

These executions are defined in the repository [schedules](https://gitlab.com/spacee/deming/rovr-proj/gateway/test-suite-automation/-/pipeline_schedules) section.



### Gateway Execution

A docker image is created via the pipeline when a commit has a version tag applied.  After publishing, the [chart](charts/) is published to ChartMuseum.

The [Rancher Deployments](https://gitlab.com/spacee/shared/rancher-deployments) repository contains all the values for gateway deployments.