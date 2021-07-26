const Messenger = require('../../../Client/getTopics')
const fetch = require("node-fetch")

const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const customerId = process.env.CUSTOMERID
const storeId = process.env.STOREID
const getDnnApi = process.env.DNNAPI + railId
const getFacingsApi = process.env.FACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.DNN
const expectedProductFacingIdOne = process.env.PRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.PRODUCTFACINGIDTWO

jest.setTimeout(60000)
jest.retryTimes(3)

describe('CV Process Tests', () => {

    it('should pass when Notification Center unzipped the file', async () => {
        const message = await Messenger.getMediaReadyMessage(dsn)

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.drone.media.uploaded')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when correct DNN is assigned to related RailId', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())

        expect('B5D4868C-C859-4A7E-BCF9-409F1CE90E10').toEqual(dnnResponse.DnnId)
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
        console.log(facingResponse)
    })

    it('should pass when product report is generated', async () => {
        const message = await Messenger.getReportCreatedMessage(dsn)
        console.log(JSON.stringify(message))

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.product.report.created')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })
})


// TODO timestamp assertions
// var myDate = new Date("2012-02-10T13:19:11+0000");
// var result = myDate.getTime();
// console.log(result); = 1328879951000