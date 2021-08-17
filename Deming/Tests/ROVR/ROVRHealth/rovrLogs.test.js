require('jest')
require('dotenv').config()
const Messenger = require('../../../Client/getTopics')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.ROVRSTOREID

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