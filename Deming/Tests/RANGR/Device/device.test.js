const DeviceApi = require('./deviceApis')
const dsn = 888
let deviceId

jest.setTimeout(60000)
jest.retryTimes(3)

describe('RANGR Device Tests', () => {
    it('should create device', async () => {
        const response = await DeviceApi.createDevice(dsn)
        deviceId = response.body.deviceId

        expect(response.status).toBe(201)
        expect(response.body.deviceSerialNumber).toEqual(dsn)
    });

    it('should return all devices', async () => {
        const response = await DeviceApi.getDevices()

        expect(response.status).toBe(200)
    });

    it('should return device with given device id', async () => {
        const response = await DeviceApi.getDevice(deviceId)

        expect(response.status).toBe(200)
    });

    it('should return device with given dsn', async () => {
        const response = await DeviceApi.getDeviceWithDsn(dsn)

        expect(response.status).toBe(200)
    });

    it('should update device with given dsn', async () => {
        const response = await DeviceApi.updateDevice(dsn)

        expect(response.status).toBe(200)
        expect(response.body.deviceId).toEqual(deviceId)
        expect(response.body.deviceSerialNumber).toEqual(dsn)
    });

    it('should delete store with given id', async () => {
        const response = await DeviceApi.deleteDevice(deviceId)

        expect(response.status).toBe(200)
        expect(response.body.affected).toEqual(1)
    });
})

