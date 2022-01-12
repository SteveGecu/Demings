const Messenger = require('../../Client/getTopics')
const fetch = require("node-fetch")

const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const dnnId = '5'
const getDnnApi = process.env.ROVRDNNAPI + railId
const getDnnIdApi = process.env.ROVRDNNIDAPI + dnnId
const getFacingsApi = process.env.ROVRFACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.ROVRDNN
const expectedProductFacingIdOne = process.env.ROVRPRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.ROVRPRODUCTFACINGIDTWO

jest.setTimeout(60000)
jest.retryTimes(3)

describe('ROVR Product Detection E2E Tests', () => {

    it('should pass when ROVR media is uploaded', async () => {
        const message = await Messenger.getRovrUploadReportMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
        expect(message.data.video).toHaveProperty
        expect(message.data.stills).toHaveProperty
    })

    it('should pass when correct DNN is assigned to related Rail Id', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())
        // let newDnn = []
        // expectedDnnId.split("").forEach(i => {
        //     newDnn.push(i.toUpperCase())
        // })
        // let upperDnn = newDnn.join('')
        // console.log(JSON.stringify(dnnResponse))
        expect(dnnResponse.DnnPath).toEqual(expectedDnnId)
    })

    it('should validate dnn id', async () => {
        const dnnResponse = await fetch(getDnnIdApi).then(res => res.json())

        expect(dnnResponse.DnnTraining.Metadata.prod_map_id).toBe(dnnId)
    });

    it('should pass when media is ready for object detection', async () => {
        const message = await Messenger.getDetectionReadyMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
        expect(message.data.video).toHaveProperty
        expect(message.data.dnn).toBe(expectedDnnId + '.pt')
    })

    it('should pass when object detection is completed', async () => {
        const message = await Messenger.getDetectionCompleteMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.complete.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
        expect(message.data.video).toHaveProperty
    })

    it('should pass when generic detection is completed', async () => {
        const message = await Messenger.getGenericDetectionCompleteMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.generic.object.detection.complete.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
        expect(message.data.video).toHaveProperty
    })

    it('should pass when fetch related facing', async () => {
        const facingResponse = await fetch(getFacingsApi).then(res => res.json())
        console.log(facingResponse);

        expect(expectedProductFacingIdOne).toEqual('' + facingResponse[0].ProductFacingID)
        expect(expectedProductFacingIdTwo).toEqual('' + facingResponse[1].ProductFacingID)
    })

    // TODO: accuracy test with output
    it('should pass when product report is generated', async () => {
        const message = await Messenger.getProductReportCreatedMessage(dsn)
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()
        console.log(JSON.stringify(message));
        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('cv.product-report-generated')
        expect(message.data.dsn).toEqual(dsn)
        expect(message.data.rail_id).toEqual(railId)
    })
})
