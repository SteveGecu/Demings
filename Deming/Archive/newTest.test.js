require('dotenv').config();
require('jest')
const { Kafka } = require('kafkajs')
const { nanoid } = require('nanoid');



describe('qa tests', () => {
    const topic = 'rovr.report.telemetry'
    const id = nanoid()
    const msg = { meta: { testId: id }, data: {} }
    let received;


    it('should receive message', async () => {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: [process.env.GATEWAY_HOST + ':30100'],
            ssl: {
                rejectUnauthorized: false,
                checkServerIdentity: () => undefined,
            },
            sasl: {
                mechanism: 'scram-sha-512',
                username: process.env.GATEWAY_USERNAME,
                password: process.env.GATEWAY_PASSWORD
            }
        })

        const consumer = await kafka.consumer({ groupId: 'test-group' })

        await consumer.connect()
        await consumer.subscribe({ topic: 'rovr.log', fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value.toString(),
                })
            },
        })


        // const consumer = kafka.consumer({ groupId: 'test-qa' })
        // consumer.connect()
        // consumer.subscribe({ topic })

        // consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //         const payload = JSON.parse(message.value.toString())
        //         console.log('Received:', JSON.stringify(payload));
        //         if (payload.meta && payload.meta.testId == id)
        //         {
        //             received = payload
        //         }
        //     }
    })

    // const producer = kafka.producer()
    // producer.connect()
    // producer.send({
    //     topic,
    //     messages: [{
    //         value: Buffer.from(JSON.stringify(msg))
    //     }]
    // })

    // expect(msg).toEqual(received)

    // producer.disconnect()

});





