const Messenger = require('../../../Client/getTopics')
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

    it('should pass when ready for barcode detection', async () => {
        const message = await Messenger.getBarcodeDetectionReadyMessage(dsn)
        console.log(message);

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.barcode.detection.ready.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when barcode detection is completed', async () => {
        const detectionCompleteMessage = await Messenger.getBarcodeDetectionCompleteMessage(dsn)
        console.log(detectionCompleteMessage);

        expect(detectionCompleteMessage).toHaveProperty
        expect(message.meta.type).toEqual('deming.barcode.detection.complete')
        expect(detectionCompleteMessage.data.dsn).toEqual(dsn)
        expect((detectionCompleteMessage.data.railId)).toEqual(railId)
    })

    it('should pass when product report is generated', async () => {
        const message = await Messenger.getBarcodeReportCreatedMessage(dsn)
        console.log(JSON.stringify(message))

        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 30 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.barcode.report.created')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })
})
