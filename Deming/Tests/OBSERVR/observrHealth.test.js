require('jest')
require('dotenv').config()
const Messenger = require('../../Client/getTopics')
const Apis = require('../../Client/getElastic')
const dsn = process.env.OBSERVRDSN
const railId = process.env.OBSERVRRAIL_ID
const customerId = process.env.OBSERVRCUSTOMERID
const storeId = process.env.OBSERVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('OBSERVR Tests', () => {

    it('Given OBSERVR should produce logs', async () => {
        const logMessage = await Apis.getObservrLogs(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('observr/log')
        expect(data.parsedJson.data.dsn).toEqual(dsn)
    })

    it('Given OBSERVR should produce Telemetry report', async () => {
        const logMessage = await Apis.getObservrTelemetryReport(dsn)
        const data = logMessage.body.hits.hits[0]._source
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)
        let a = new Date().valueOf()
        let b = new Date(telemetryMessage.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(5 * 60 * 1000)
        expect(data.mqtt.topic).toEqual('observr/report/telemetry')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('Temperature value should be lower then 85', async () => {
        const logMessage = await Apis.getObservrTelemetryReport(dsn)
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(telemetryMessage.data.os.temperature).not.toBeGreaterThan(85)
    });

    it('Given OBSERVR disc usage should not be over 50 ', async () => {
        const logMessage = await Apis.getObservrTelemetryReport(dsn)
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.os.diskUsagePercent)).not.toBeGreaterThan(50)
    });
})