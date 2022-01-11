require('jest')
require('dotenv').config()
const Messenger = require('../../Client/getTopics')
const Apis = require('../../Client/getElastic')
const Terminal = require('../../Client/GatewayConsumer')
const { forEach } = require('jszip')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
const customerId = process.env.ROVRCUSTOMERID
const storeId = process.env.ROVRSTOREID

jest.setTimeout(60000)
jest.retryTimes(3)

describe('ROVR Health Tests', () => {

    it('Given ROVR should produce logs', async () => {
        const logMessage = await Apis.getRovrLogs(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.mqtt.topic).toEqual('rovr/log')
        expect(data.parsedJson.data.dsn).toEqual(dsn)
    })

    it('should not throw battery error', async () => {
        const logMessage = await Apis.getRovrLogs(dsn)
        const data = logMessage.body.hits.hits[0]._source

        expect(data.message).not.toBe('Error writing to address 54 register 15 with value 110528: Error: Invalid word 110528')
    });

    it('Given ROVR should produce Run Report after run', async () => {
        const logMessage = await Apis.getRovrRunReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const data = logMessage.body.hits.hits[0]._source
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        let a = new Date().valueOf()
        let b = new Date(telemetryMessage.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(60 * 60 * 1000)
        expect(data.mqtt.topic).toEqual('rovr/report/run')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('Given ROVR should produce Telemetry report', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const data = logMessage.body.hits.hits[0]._source
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)
        let a = new Date().valueOf()
        let b = new Date(telemetryMessage.meta.originEventTimestamp).valueOf()

        expect(a - b).toBeLessThan(5 * 60 * 1000)
        expect(data.mqtt.topic).toEqual('rovr/report/telemetry')
        expect(data.parsedJson.data.provisioning.dsn).toEqual(dsn)
    })

    it('Battery voltage value should be greater than 3', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(telemetryMessage.data.battery.voltage.rawNumericValue).toBeGreaterThan(3)
    });

    it('Temperature value should be lower then 85', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(telemetryMessage.data.temperature).not.toBeGreaterThan(85)
    });

    it('Given ROVR disc usage should not be over 50 ', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.diskUsagePercent)).not.toBeGreaterThan(50)
    });

    it('Wifi Signal Level should not be lower the -80', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.wifiMetrics.signalLevel)).not.toBeLessThan(-80)
    });

    it('Battery reported capacity should not be lower then 500', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.battery.reportedCapacity.rawNumericValue)).not.toBeLessThan(500)
    });

    it('Camera temperature should be lower then 60', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }

        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)

        expect(parseInt(telemetryMessage.data.cameraTemperature)).not.toBeGreaterThan(60)
    });

    
    it.skip('passedStartupDiagnostics data should be true', async () => {
        const logMessage = await Apis.getRovrTelemetryReport(dsn)
        if (logMessage.body.hits.hits.length == 0) { throw 'Unable to retrieve telemetry report for drone'; }
        const message = logMessage.body.hits.hits[0]._source.message
        const telemetryMessage = JSON.parse(message)
        expect(parseInt(telemetryMessage.data.passedStartupDiagnostics)).toBeTruthy();
    });

    it('Mac address should match DSN', async () => {
        const macAdress = await Terminal.getMacAddress()
        console.log(macAdress);

        expect(macAdress).toBe(dsn)
    });

    it('data folder test', async () => {
        const configEnvFile = await Terminal.getConfigFile()
        const endcapEnvFile = await Terminal.getEndcapFile()
        const mobileEnvFile = await Terminal.getMobileFile()

        expect(parseInt(configEnvFile)).toEqual(1)
        expect(parseInt(endcapEnvFile)).toEqual(1)
        expect(parseInt(mobileEnvFile)).toEqual(1)
    });
})