require('jest')
require('dotenv').config()
const Messenger = require('../../Client/getTopics')
const Apis = require('../../Client/getElastic')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.ROVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('ROVR Log Tests', () => {

    it('should return latest log message for given dsn', async () => {
        const logMessage = await Apis.getRovrLogs(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('rovr/log')
        expect(data.parsedJson.data.dsn).toEqual(dsn)
    })

    it('should return latest log message for given dsn', async () => {
        const logMessage = await Apis.getRovrRunReport(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('rovr/report/run')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('should return latest log message for given dsn', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('rovr/report/telemetry')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    // TODO
    // add heat tests
    // add battery tests
    // add config test thru telemtry 
})

// TODO: add timestamp test