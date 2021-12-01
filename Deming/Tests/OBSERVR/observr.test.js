require('jest')
require('dotenv').config()
const fetch = require("node-fetch")
const Messenger = require('../../Client/getTopics')
const Apis = require('../../Client/getElastic')
const dsn = process.env.OBSERVRDSN
const railId = process.env.OBSERVRRAIL_ID
const dnnId = '5'
const customerId = process.env.OBSERVRCUSTOMERID
const storeId = process.env.OBSERVRSTOREID
const getDnnApi = process.env.OBSERVRDNNAPI + railId
const getDnnIdApi = process.env.OBSERVRDNNIDAPI + dnnId
const getFacingsApi = process.env.OBSERVRFACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.OBSERVRDNN
const expectedProductFacingIdOne = process.env.OBSERVRPRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.OBSERVRPRODUCTFACINGIDTWO

jest.setTimeout(60000)
jest.retryTimes(3)

describe('OBSERVR Product Detection E2E Tests', () => {
    it('should pass when Notification Center unzipped the file', async () => {
        const message = await Messenger.getObservrMediaReadyMessage(dsn)

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.observr.media.uploaded')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    });

    it('should pass when correct DNN is assigned to related RailId', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())
        const expectedDnnId = process.env.OBSERVRDNN
        console.log(dnnResponse);

        expect(dnnResponse.DnnId).toEqual(expectedDnnId)
    })

    it('should pass when ready for object detection', async () => {
        const message = await Messenger.getObservrDetectionReadyMessage(dsn)

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.observr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when object detection is completed', async () => {
        const detectionCompleteMessage = await Messenger.getObservrDetectionCompleteMessage(dsn)

        expect(detectionCompleteMessage).toHaveProperty
        expect(detectionCompleteMessage.data.dsn).toEqual(dsn)
        expect((detectionCompleteMessage.data.railId)).toEqual(railId)
    })

    it('should pass when fetch related facing', async () => {
        const facingResponse = await fetch(getFacingsApi).then(res => res.json())
        console.log(facingResponse);

        // expect(expectedProductFacingIdOne).toEqual('' + facingResponse[0].ProductFacingID)
        // expect(expectedProductFacingIdTwo).toEqual('' + facingResponse[1].ProductFacingID)
    })

    it('should pass when product report is generated', async () => {
        const message = await Messenger.getReportCreatedMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.product.report.created')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })
})