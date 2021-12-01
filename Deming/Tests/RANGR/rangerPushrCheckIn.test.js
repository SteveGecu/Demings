const Messenger = require('../../Client/getTopics'); 

describe('RANGERS pushr check-in test', () => {
//pushr.check-in topic should be improved, it has only dsn number.. 
    it('should return the message', async () => {
        const message = await Messenger.getRangersPushCheckInMessage(551); 
        const dsnAvailable = message.map(e => e.pusherCheckInEvent.dsn === 551)
        expect(dsnAvailable).toBeTruthy();
    })
})