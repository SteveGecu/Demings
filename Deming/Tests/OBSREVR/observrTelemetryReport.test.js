const Messenger = require('../../Client/getTopics')
const dsn = process.env.OBSERVRDSN
const railId = process.env.OBSERVRRAIL_ID
const customerId = process.env.OBSERVRCUSTOMERID
const storeId = process.env.OBSERVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('Telemetry Report Tests', () => {

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