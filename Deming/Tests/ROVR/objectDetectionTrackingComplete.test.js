const Consumer = require('../../Client/GatewayConsumer')
const Messenger = require('../../Client/getTopics')

const topic = 'deming.object.detection.tracking.complete'
const dsn = process.env.DSN
const railId = process.env.RAIL_ID

describe('detection Tests', () => {

    it('should get message when tracking is complete', async () => {
        const trackingCompleteMessage = await Messenger.getTrackingCompleteMessage(dsn)
        console.log(trackingCompleteMessage)

        expect(trackingCompleteMessage).toHaveProperty
        expect(trackingCompleteMessage.data.dsn).toEqual(dsn)
        expect((trackingCompleteMessage.data.railId)).toEqual(railId)
        expect(trackingCompleteMessage.data.distances).toHaveProperty
    })
})