require('jest')
require('dotenv').config()
const Messenger = require('../../../Client/getTopics')
const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const customerId = process.env.CUSTOMERID
const storeId = process.env.STOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('ROVR Log Tests', () => {

    it('should return latest log message for given dsn', async () => {
        const logMessage = await Messenger.getRovrLogMessage(dsn)
        console.log(logMessage)
        expect(logMessage.meta.type).toEqual('drone.logs')
        expect(logMessage.data.dsn).toEqual(dsn)
        expect(logMessage.data.railId).toEqual(railId)
        expect(logMessage.data.customerId).toEqual(customerId)
        expect(logMessage.data.storeId).toEqual(storeId)
    })
})