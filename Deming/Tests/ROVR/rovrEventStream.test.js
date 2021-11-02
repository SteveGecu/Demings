const Messenger = require('../../Client/getTopics')

const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.RORVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('Rovr Event Stream Tests', () => {
    it('should ', async () => {
        const message = await Messenger.getEventStreamMessage(dsn)
        console.log(JSON.stringify(message));

        expect(message.data.payload.dsn).toEqual(dsn)
        expect(message.data.payload.railId).toEqual(railId)
        expect(message.data.payload.description).not.toContain('error')
    });
})