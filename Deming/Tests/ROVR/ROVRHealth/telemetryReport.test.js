const Messenger = require('../../../Client/getTopics')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.ROVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('Telemetry Report Tests', () => {

    it('should get telemetry message', async () => {
        const telemetryMessage = await Messenger.getRovrTelemetryReportMessage(dsn)
        console.log(telemetryMessage)
        expect(telemetryMessage.meta.type).toEqual('telemetry.report')
        expect(telemetryMessage.data.provisioning.dsn).toEqual(dsn)
        expect(telemetryMessage.data.provisioning.railId).toEqual(railId)
        expect(telemetryMessage.data.customerId).toEqual(customerId)
        expect(telemetryMessage.data.storeId).toEqual(storeId)
    })
})