require('jest')
require('dotenv').config()
const Messenger = require('../../Client/getTopics')
const dsn = process.env.OBSERVRDSN
const railId = process.env.OBSERVRRAIL_ID
const customerId = process.env.OBSERVRCUSTOMERID
const storeId = process.env.OBSERVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('OBSERVR Log Tests', () => {

    // TODO change to api calls
    it('should return latest log message for given OBSERVR dsn', async () => {
        const logMessage = await Messenger.getObservrLogMessage(dsn)
        console.log(logMessage)
        expect(logMessage.meta.type).toEqual('observr.log')
        expect(logMessage.data.dsn).toEqual(dsn)
        expect(logMessage.data.railId).toEqual(railId)
        expect(logMessage.data.customerId).toEqual(customerId)
        expect(logMessage.data.storeId).toEqual(storeId)
    })

    it('should get telemetry message', async () => {
        const telemetryMessage = await Messenger.getObservrTelemetryReportMessage(dsn)
        console.log(telemetryMessage)
        expect(telemetryMessage.meta.type).toEqual('observr.report.telemetry')
        expect(telemetryMessage.data.provisioning.dsn).toEqual(dsn)
        expect(telemetryMessage.data.provisioning.railId).toEqual(railId)
        expect(telemetryMessage.data.customerId).toEqual(customerId)
        expect(telemetryMessage.data.storeId).toEqual(storeId)
    })
})