require('dotenv').config();
require('jest');
const { nanoid } = require('nanoid');
const { KafkaTest } = require('expect-kafka'); // This library handles connecting to Kafka (strimzi and confluent)
const waitForExpect = require('wait-for-expect');
const mqtt = require('async-mqtt'); // This library is for connecting to MQTT
const { ESQueryClient } = require('./es-query-client');
const { ESQueryBuilder } = require('./es-query-builder');

class connectMqtt {
    config;
    constructor(config) {
        this.config = config;
    }
    legacyMqttClient;
    legacyMqttMessages;
    mqttClient;
    mqttMessages = [];

    mqttConnect() {

        mqtt.connectAsync('tcp://' + process.env.GATEWAY_HOST + ':1883', {
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        })
            .then(client => {
                mqttClient = client;
                return mqttClient.subscribe('rovr/request/config-update', { qos: 2 });
            }),
            mqtt.connectAsync('tcp://' + process.env.GATEWAY_HOST + ':1883')
                .then(client => {
                    legacyMqttClient = client;
                    return legacyMqttClient.subscribe('config/update/request', { qos: 2 });
                })

        mqttClient.on('message', (topic, message) => {
            mqttMessages.push({
                topic,
                message
            })
        });
        legacyMqttClient.on('message', (topic, message) => {
            legacyMqttMessages.push({
                topic,
                message
            })
        });
    }
}




module.exports = {
    mqttConnect();
}