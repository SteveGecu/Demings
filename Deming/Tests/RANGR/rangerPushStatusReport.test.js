const Messenger = require('../../Client/getTopics'); 

describe('RANGERS pushr status report', () => {
//pushr.check-in topic should be improved, it has only dsn number.. 
    it('should return status report', async () => {
        const message = await Messenger.getRangersPushStatusReport(551); 
        console.log(JSON.stringify(message));
        expect(message.statusReportEvent).toHaveProperty("time");
        expect(message.statusReportEvent.message).toHaveProperty("header");
        expect(message.statusReportEvent.message).toHaveProperty("info");
        expect(message.statusReportEvent.message.header).toHaveProperty("microHeader");
        expect(message.statusReportEvent.message.header.microHeader.multiPacket).toBe("single");
        expect(message.statusReportEvent.message.header.microHeader.resent).toBeFalsy();
        expect(message.statusReportEvent.message.header.microHeader.security).toBeFalsy();
        expect(message.statusReportEvent.message.header.deviceSerialNumber).toBe(551);
        expect(message.statusReportEvent.message.header.messageNumber).not.toBeNull();
        expect(message.statusReportEvent.message.header.messageSize).toBeGreaterThan(0);
        expect(message.statusReportEvent.message.info.messageType.className).toBe("response");
        expect(message.statusReportEvent.message.info.messageType.typeName).toBe("sendStatusResponse");
        expect(message.statusReportEvent.message.info.messageType.byteIndex).not.toBeNull();
        expect(message.statusReportEvent.message.info.information).toHaveProperty("data");
        expect(message.statusReportEvent.message.info.information.data.type).toBe("Buffer");
        expect(message.statusReportEvent.message.info.information.data.data).not.toBeNull();
        expect(message.statusReportEvent.message.info.information.multiPacket).toBe("single");
        expect(message.statusReportEvent.message.info.information.bagDistances.distance).not.toBeNull();
        expect(message.statusReportEvent.message.info.information.bagDistances.time).not.toBeNull();
        expect(message.statusReportEvent.message.info.information.numberOfReadings).toBe(1);
        expect(message.statusReportEvent.message.info.information.bagPresence).toBeNull();
        expect(message.statusReportEvent.message.info.information.runtimeRemainingFraction).not.toBeNull();
        expect(message.statusReportEvent.message.info.information.snr).toBeGreaterThan(0);
        expect(message.statusReportEvent.message.info.information.rssi).toBeLessThan(0); 
    })
})