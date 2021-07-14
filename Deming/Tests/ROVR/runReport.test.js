const Messenger = require('../../Client/getTopics')
const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const customerId = process.env.CUSTOMERID
const storeId = process.env.STOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('Run Report Tests', () => {

    it('should get Run Report Message ', async () => {
        const runReportMessage = await Messenger.getRovrRunReportMessage(dsn)
        console.log(runReportMessage)
        expect(runReportMessage.meta.type).toEqual('rovr.report.run')
        expect(runReportMessage.data.provisioning.dsn).toEqual(dsn)
        expect(runReportMessage.data.provisioning.railId).toEqual(railId)
        expect(runReportMessage.data.run).toBeTruthy
        expect(runReportMessage.data.success).toBeTruthy
        expect(runReportMessage.data.customerId).toEqual(customerId)
        expect(runReportMessage.data.storeId).toEqual(storeId)
    })
})
