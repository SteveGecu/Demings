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

    it('should return latest log message for given OBSERVR dsn', async () => {
        const logMessage = await Messenger.getObservrLogMessage(dsn)
        console.log(logMessage)
        expect(logMessage.meta.type).toEqual('observr.log')
        expect(logMessage.data.dsn).toEqual(dsn)
        expect(logMessage.data.railId).toEqual(railId)
        expect(logMessage.data.customerId).toEqual(customerId)
        expect(logMessage.data.storeId).toEqual(storeId)
    })
})