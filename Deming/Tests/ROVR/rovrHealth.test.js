require('jest')
require('dotenv').config()
const Messenger = require('../../Client/getTopics')
const Apis = require('../../Client/getElastic')
const { forEach } = require('jszip')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.ROVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('ROVR Health Tests', () => {

    it('Given ROVR should produce logs', async () => {
        const logMessage = await Apis.getRovrLogs(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('rovr/log')
        expect(data.parsedJson.data.dsn).toEqual('123')
    })

    it('Given ROVR should produce Run Report after run', async () => {
        const logMessage = await Apis.getRovrRunReport(dsn)
        const data = logMessage.body.hits.hits[0]._source
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        let a = new Date().valueOf()
        let b = new Date(telemetryMessage.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(data.mqtt.topic).toEqual('rovr/report/run')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('Given ROVR should produce Telemetry report', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        const data = logMessage.body.hits.hits[0]._source
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)
        let a = new Date().valueOf()
        let b = new Date(telemetryMessage.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(5 * 60 * 1000)
        expect(data.mqtt.topic).toEqual('rovr/report/telemetry')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('Battery voltage value should be greater than 3', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(telemetryMessage.data.battery.voltage.rawNumericValue).toBeGreaterThan(3)
    });

    it('Temperature value should be lower then 85', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(telemetryMessage.data.temperature).not.toBeGreaterThan(85)
    });

    it('Given ROVR disc usage should not be over 50 ', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.diskUsagePercent)).not.toBeGreaterThan(50)
    });

    // TODO
    // add config test thru telemtry 
})