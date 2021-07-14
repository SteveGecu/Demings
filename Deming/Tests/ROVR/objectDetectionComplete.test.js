const Consumer = require('../../Client/GatewayConsumer')
const Messenger = require('../../Client/getTopics')

const topic = 'deming.object.detection.complete.rovr'
const dsn = process.env.DSN
const railId = process.env.RAIL_ID

describe('Detection Tests', () => {

    it('should get message when detection is complete', async () => {
        const detectionCompleteMessage = await Messenger.getDetectionCompleteMessage(dsn)
        console.log(detectionCompleteMessage)

        expect(detectionCompleteMessage).toHaveProperty
        expect(detectionCompleteMessage.data.dsn).toEqual(dsn)
        expect((detectionCompleteMessage.data.railId)).toEqual(railId)

    })
})