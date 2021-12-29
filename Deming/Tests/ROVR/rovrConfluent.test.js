const Messenger = require('../../Client/getConfluentTopics')
const fetch = require("node-fetch")

const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const dnnId = '5'
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.RORVRSTOREID
const getDnnApi = process.env.ROVRDNNAPI + railId
const getDnnIdApi = process.env.ROVRDNNIDAPI + dnnId
const getFacingsApi = process.env.ROVRFACINGAPI + railId + '/product-facings'
const expectedDnnId = process.env.ROVRDNN
const expectedProductFacingIdOne = process.env.ROVRPRODUCTFACINGIDONE
const expectedProductFacingIdTwo = process.env.ROVRPRODUCTFACINGIDTWO

//TODO: ad tests
describe('Rovr Confluent Tests', () => {

    it('should test when detection ready', async () => {
        const message = await Messenger.getGenericDetectionReportReady(dsn)
     
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('cv.generic-detection-report-ready')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.rail_id)).toEqual(railId)
        expect(message.data.detections).toHaveProperty
    });

    it('should test when report generated', async () => {
        const message = await Messenger.getGenericDetectionReportGenerated(dsn)
        
        let a = new Date().valueOf()
        let b = new Date(message.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('product_report_generated')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.rail_id)).toEqual(railId)
        expect(message.data.detections).toHaveProperty
    });

    it('should test when getting images', async () => {
        const message = await Messenger.getDetectionsByImage(dsn)

        expect(message.dsn).toEqual(dsn)
        expect((message.rail_id)).toEqual(railId)
        expect(message.detection_data).toHaveProperty
    });
});