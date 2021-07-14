require('dotenv').config()
const { Kafka } = require('kafkajs')
const fetch = require("node-fetch")
let fake = require('faker')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.GATEWAY_HOST + ':30100'],
    ssl: {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined,  // Disables TLS hostname verification
    },
    sasl: {
        mechanism: 'scram-sha-512', // what is this?
        username: process.env.GATEWAY_USERNAME,
        password: process.env.GATEWAY_PASSWORD
    },
    clientId: 'e2e-gateway-test', // can we change this? what is this?
    retry: {
        retries: 3
    }
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: 'rovr.log',
        fromBeginning: true //whats happening if false
    })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = JSON.parse(message.value.toString())
            console.log('Received:', JSON.stringify(payload));
        }
    })
}

// fetch(`https://shared-qa-eastus2.azure-api.net/inference-svc/api/v1/dnn?railId=72BB78CB-9CF5-475F-B568-FA0AFD3F6C5C`).
//     then(res => res.json()).
//     then(data => console.log(data))



// run();


console.log(fake.name.firstName())




