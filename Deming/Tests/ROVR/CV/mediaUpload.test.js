const Messenger = require('../../../Client/getTopics')
const dsn = process.env.DSN
const railId = process.env.RAIL_ID

describe('MinIO Tests', () => {

    it('should return message when media is uploaded', async () => {
        const uploadMessage = await Messenger.getRovrUploadReportMessage(dsn)
        console.log(uploadMessage)
        expect(uploadMessage).toHaveProperty
        expect(uploadMessage.Key.slice(20, 32)).toEqual(dsn)
    })
})