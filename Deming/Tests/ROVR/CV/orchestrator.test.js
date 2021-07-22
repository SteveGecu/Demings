const Messenger = require('../../../Client/getTopics')
const fetch = require("node-fetch")
const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const getDnnApi = `https://shared-qa-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=${ railId }`
const expectedDnnId = 'B5D4868C-C859-4A7E-BCF9-409F1CE90E10'

describe('Orchestrator Tests', () => {

    it('should get expected dnn', async () => {
        const dnnResponse = await fetch(getDnnApi).then(res => res.json())

        expect(expectedDnnId).toEqual(dnnResponse.DnnId)
    })

    it('should pass when got unzipped media', async () => {
        const message = await Messenger.getMediaReadyMessage(dsn)

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.rovr.rail.drone.media.uploaded')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })

    it('should pass when ready for detection', async () => {
        const message = await Messenger.getDetectionReadyMessage(dsn)

        expect(message).toHaveProperty
        expect(message.meta.type).toEqual('deming.object.detection.ready.rovr')
        expect(message.data.dsn).toEqual(dsn)
        expect((message.data.railId)).toEqual(railId)
    })
})