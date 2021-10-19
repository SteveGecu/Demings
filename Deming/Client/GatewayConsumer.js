const { Kafka } = require('kafkajs');
require('dotenv').config();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const faker = require('faker');
const { forEach } = require('jszip');
const dsn = '001f7b31ddbc'

// create consumer by passing creds and configs
function createConsumer() {
    const kafkaConfig = {
        clientId: faker.name.firstName(),
        brokers: [process.env.GATEWAY_HOST + ':30100'],
        ssl: {
            rejectUnauthorized: false,
            checkServerIdentity: () => undefined,
        },
        sasl: {
            mechanism: 'scram-sha-512',
            username: process.env.GATEWAY_USERNAME,
            password: process.env.GATEWAY_PASSWORD
        },
        retry: {
            retries: 3
        },
    }
    const consumerConfig = {
        groupId: faker.name.lastName(),
        sessionTimeout: 30000,
        heartbeatInterval: 20000,
        maxWaitTimeInMs: 2000
    }

    const kafka = new Kafka(kafkaConfig)
    const consumer = kafka.consumer(consumerConfig)

    return consumer
}

// create consumer and assign to var
let kafkaConsumer = createConsumer();
let timer;

// this function is to fetch desired message from desired topic by passing a callback function
// calback returns a boolean
// if boolean is true Promise will be solved and method will return the Promise
// in test page fetchMessageForDsn will assign to a var this var will be used in assertions
async function fetchMessageForGivenDsn(topic, callback, timeout = 60000) {
    return new Promise(async (resolve, reject) => {
        timer = setTimeout(() => {
            reject(new Error('Timed out waiting for message from dsn:', dsn));
        }, timeout);
        try
        {
            await kafkaConsumer.connect()
            await kafkaConsumer.subscribe({
                topic: topic,
                fromBeginning: false
            })
            await kafkaConsumer.run({
                eachMessage: async ({ message }) => {
                    const payload = JSON.parse(message.value.toString())
                    if (callback(payload)) // if callback turns true (it returns true when dns is eq to given dns)
                    {
                        resolve(payload); // resolve payload=> means return the payload
                    }
                }
            })
        } catch (error)
        {
            reject(error); // if error payload will not return
        }
    }).finally(() => {
        if (timer)
        {
            clearInterval(timer);  // both status results with timer
        }
    })
}

// this function is to fetch desired message from desired topic by passing topic name and dsn
async function fetchMessageForDsn(topic, dsn, timeout = 30000) {
    return await fetchMessageForGivenDsn(topic, (payload) => {
        return payload.data.dsn == dsn || payload.data.provisioning.dsn == dsn
    }, timeout);
}

// this function is to fetch first message from desired topic
async function fetchOneMessage(topic, timeout = 30000) {
    return fetchMessageForGivenDsn(topic, () => true, timeout);
}

async function disconnection() {
    await kafkaConsumer.disconnect()
}

// this function is returning an array of desired topic with 
async function getKafkacatMessage(topic, n = 1) {
    const { stdout, stderr } = await exec('kcat -b ' + process.env.GATEWAY_HOST + ':30100 -C -t ' + topic + ' -o -' + n + ' -e ');
    const messages = stdout.split('\n').map(line => {
        try
        {
            return JSON.parse(line)
        } catch (e)
        {
            return null
        }
    })
        .filter(msg => !!msg)

    return messages;
}

async function getConfluentKafkacatMessage(topic, n = 1) {
    const { stdout, stderr } = await exec('kcat -F ~/.config/kafkacatconfluent.conf -C -t ' + topic + ' -o -' + n + ' -e ');
    const messages = stdout.split('\n').map(line => {
        try
        {
            return JSON.parse(line)
        } catch (e)
        {
            return null
        }
    })
        .filter(msg => !!msg)

    return messages;
}

module.exports = {
    fetchMessageForDsn,
    fetchMessageForGivenDsn,
    disconnection,
    fetchOneMessage,
    getKafkacatMessage,
    getConfluentKafkacatMessage
}