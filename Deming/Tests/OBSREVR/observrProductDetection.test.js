const Messenger = require('../../Client/getTopics')
const fetch = require("node-fetch")

const dsn = process.env.OBSERVRDSN
const railId = process.env.OBSERVRRAIL_ID
const customerId = process.env.OBSERVRCUSTOMERID
const storeId = process.env.OBSERVRSTOREID
const getDnnApi = process.env.OBSERVRDNNAPI + railId
const getFacingsApi = process.env.OBSERVRDNNFACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.OBSERVRDNN
const expectedProductFacingIdOne = process.env.OBSERVRPRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.OBSERVRPRODUCTFACINGIDTWO

jest.setTimeout(60000)
jest.retryTimes(3)

describe('Obersvr CV Pipeline Tests', () => {

    it('should pass when ', async () => {
        const message = await Messenger.getObservrMediaReadyMessage(dsn)
        console.log(message);

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.observr.media.uploaded')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    });

    it('should ', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())
        console.log(JSON.stringify(dnnResponse));

        expect('143649AB-2C5E-4840-A864-09CEF1E49F87').toEqual(dnnResponse.DnnId)
    });

    it('should pass when ready for object detection', async () => {
        const message = await Messenger.getObservrDetectionReadyMessage(dsn)
        console.log(message);

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.observr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when object detection is completed', async () => {
        const detectionCompleteMessage = await Messenger.getObservrDetectionCompleteMessage(dsn)
        console.log(detectionCompleteMessage);
        expect(detectionCompleteMessage).toHaveProperty
        expect(detectionCompleteMessage.data.dsn).toEqual(dsn)
        expect((detectionCompleteMessage.data.railId)).toEqual(railId)
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

        console.log(a);
        console.log(b);
        expect(a - b).toBeLessThan(60 * 30 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.product.report.created')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })
})