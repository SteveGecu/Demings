const Messenger = require('../../Client/getTopics'); 

describe('RANGERS pushr status report', () => {
//pushr.check-in topic should be improved, it has only dsn number.. 
    it('should return status report', async () => {
        const message = await Messenger.getRangersPushStatusReport(551); 
        //console.log(JSON.stringify(message));
        expect(message.statusReportEvent.message.header.deviceSerialNumber).toBe(551)
    })
})