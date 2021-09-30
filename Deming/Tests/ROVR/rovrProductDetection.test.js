const Messenger = require('../../Client/getTopics')
const fetch = require("node-fetch")

const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.RORVRSTOREID
const getDnnApi = process.env.ROVRDNNAPI + railId
const getFacingsApi = process.env.ROVRFACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.ROVRDNN
const expectedProductFacingIdOne = process.env.ROVRPRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.ROVRPRODUCTFACINGIDTWO

jest.setTimeout(60000)
jest.retryTimes(3)

describe('CV Process Tests', () => {

    it('should pass when Notification Center unzipped the file', async () => {
        const message = await Messenger.getMediaReadyMessage(dsn)
        console.log(message);

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.drone.media.uploaded')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when correct DNN is assigned to related RailId', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())

        expect(expectedDnnId).toEqual(dnnResponse.DnnId)
    })

    it('should pass when ready for object detection', async () => {
        const message = await Messenger.getDetectionReadyMessage(dsn)
        console.log(message);

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when object detection is completed', async () => {
        const detectionCompleteMessage = await Messenger.getDetectionCompleteMessage(dsn)
        console.log(detectionCompleteMessage);
        expect(detectionCompleteMessage).toHaveProperty
        expect(detectionCompleteMessage.data.dsn).toEqual(dsn)
        expect((detectionCompleteMessage.data.railId)).toEqual(railId)
    })

    it('should pass when object tracking is complete', async () => {
        const trackingCompleteMessage = await Messenger.getTrackingCompleteMessage(dsn)
        console.log(trackingCompleteMessage);

        expect(trackingCompleteMessage).toHaveProperty
        expect(trackingCompleteMessage.data.dsn).toEqual(dsn)
        expect((trackingCompleteMessage.data.railId)).toEqual(railId)
        expect(trackingCompleteMessage.data.distances).toHaveProperty
    })

    it('should pass when fetch related facing', async () => {
        const facingResponse = await fetch(getFacingsApi).then(res => res.json())
        console.log(facingResponse);

        expect(expectedProductFacingIdOne).toEqual('' + facingResponse[0].ProductFacingID)
        expect(expectedProductFacingIdTwo).toEqual('' + facingResponse[1].ProductFacingID)
    })

    it('should pass when product report is generated', async () => {
        const message = await Messenger.getReportCreatedMessage(dsn)
        console.log(JSON.stringify(message))

        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.product.report.created')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)

        console.log(JSON.stringify(message));
    })

    //TODO
    it('should validate product report went thru SIS', async () => {
        const message = await Messenger.getCompleteReport(railId)
        console.log(JSON.stringify(message));
    });
})
