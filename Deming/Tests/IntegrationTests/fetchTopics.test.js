require('jest')
const { getKafkaAdmin, getKafkaConsumer, getKafkaProducer, } = require('../../Archive/Kafka')
const dsn = process.env.ROVRDSN
const railId = process.env.ROVRRAIL_ID
// const { wait } = require('./utils');
// const axios = require('axios');
// const mqtt = require('async-mqtt');
// const {uploadToMinio} = require('./minio')
// const {nanoid} = require('nanoid');

jest.setTimeout(60000)
jest.retryTimes(3) // Some tests just fail because of slow networks or race conditions. Just to be sure, we retry 3 times in case of failure

describe('topic tests', () => {
    let consumer
    let producer
    let admin
    let mqttClient

    afterEach(async () => {
        if (consumer)
        {
            await consumer.disconnect()
        }

        if (producer)
        {
            await producer.disconnect()
        }
        if (admin)
        {
            await admin.disconnect()
        }
        if (mqttClient)
        {
            await mqttClient.end()
        }
    })

    it('fetch all topics', async () => {
        const admin = await getKafkaAdmin('gateway')
        const topics = await admin.fetchTopicMetadata()

        const names = topics.topics.map(t => t.name).sort()
        console.log(names)
        expect(names).toContainEqual('rovr.log')

    })
})