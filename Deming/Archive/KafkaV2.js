require('dotenv').config();
require('jest');
const { nanoid } = require('nanoid');

const { KafkaTest } = require('expect-kafka'); // This library handles connecting to Kafka (strimzi and confluent)
const waitForExpect = require('wait-for-expect');
const mqtt = require('async-mqtt'); // This library is for connecting to MQTT
const { ESQueryClient } = require('./es-query-client');
const { ESQueryBuilder } = require('./es-query-builder');

waitForExpect.defaults.timeout = 10000;
waitForExpect.defaults.interval = 1000;

jest.setTimeout(60000)

export class ConnectKafka{
    // config;
    // kafkaGateway;
    // constructor(config) {
    //     this.config = config;
    // }

    kafkaGateway = new KafkaTest({
        brokers: [process.env.GATEWAY_HOST + ':30100'],
        topics: ['rovr.log', 'rovr.request.config-update'],
        groupId: 'e2e-gateway-test',
        ssl: {
            verifyServerCertificate: false // Set to false to skip server ca verification (defaults to true)
        },
        authentication: {
            sasl: {
                mechanism: 'scram-sha-512', // Supports 'plain', 'scram-sha-256', 'scram-sha-512'
                username: process.env.GATEWAY_USERNAME,
                password: process.env.GATEWAY_PASSWORD,
            }
        }
    });
    async connectKafkaGateway(){
        kafkaGateway.connect()
    }
    
     disconnectKafkaGateway(){
        kafkaGateway.clear()
        kafkaGateway.disconnect()
    }

}

// module.exports = {
//     connectKafkaGateway,
//     disconnectKafkaGateway
// }