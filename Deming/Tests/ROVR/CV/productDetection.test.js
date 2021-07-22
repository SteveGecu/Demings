const Messenger = require('../../../Client/getTopics')
const fetch = require("node-fetch")

const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const customerId = process.env.CUSTOMERID
const storeId = process.env.STOREID
const getDnnApi = `https://shared-qa-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=${ railId }`
const getFacingsApi = `https://shared.qa.eastus2.deming.spacee.io/api/v1/rail/${ railId }/product-facings`
const expectedDnnId = 'B5D4868C-C859-4A7E-BCF9-409F1CE90E10'
const expectedProductFacingIdOne = 470
const expectedProductFacingIdTwo = 484

jest.setTimeout(60000)
jest.retryTimes(3)

describe('CV Process Tests', () => {

    test('should pass when ROVR uploads the file', async () => {
        const uploadMessage = await Messenger.getRovrUploadReportMessage(dsn)

        expect(uploadMessage).toHaveProperty
        expect(uploadMessage.Key.slice(20, 32)).toEqual(dsn)
    })

    it('should pass when Notification Center unzipped the file', async () => {
        const message = await Messenger.getMediaReadyMessage(dsn)

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

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when object detection is completed', async () => {
        const detectionCompleteMessage = await Messenger.getDetectionCompleteMessage(dsn)

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

        expect(expectedProductFacingIdOne).toEqual(facingResponse[0].ProductFacingID)
        expect(expectedProductFacingIdTwo).toEqual(facingResponse[1].ProductFacingID)
        console.log(facingResponse)
    })

    it('should pass when product report is generated', async () => {
        const message = await Messenger.getReportCreatedMessage(dsn)
        console.log(message)

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