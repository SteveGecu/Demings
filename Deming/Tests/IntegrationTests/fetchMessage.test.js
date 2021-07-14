require('jest')
const { fetchMessageForDsn, fetchOneMessage, fetchMessageForGivenDsn, disconnection } = require('../../Client/GatewayConsumer')


jest.setTimeout(60000)
jest.retryTimes(3)

const topic = 'rovr.report.telemetry'
const dsn = process.env.DSN
const railId = process.env.RAIL_ID
const timeout = 60 * 1000

describe('fetch message tests', () => {

    it('should fetch Telemetry Report message of given ROVR by checking dsn', async () => {
        const logMessage = await fetchMessageForGivenDsn(topic, (payload) => {
            return payload.data.provisioning.dsn == dsn
        }, timeout)
        console.log(logMessage)
        expect(logMessage.data.provisioning.dsn).toEqual(dsn)
    })

    it('should fetch Telemetry Report message of given DSN', async () => {
        const logMessage = await fetchMessageForDsn(topic, dsn)
        console.log(logMessage)
        expect(logMessage.data.provisioning.dsn).toEqual(dsn)
    })

    it('should fetch the first message of given topic', async () => {
        const logMessage = await fetchOneMessage(topic)
        console.log(logMessage)

    })

    afterEach(async () => {
        await disconnection()
    })
})