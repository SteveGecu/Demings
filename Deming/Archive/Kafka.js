const fs = require('fs');
const { Kafka } = require('kafkajs');
require('dotenv').config();

function getKafkaClient(target) {
  switch (target) {
    case 'gateway':
      return new Kafka({
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
          retries: 0
        }
      })
    case 'confluent':
      return new Kafka({
        brokers: [process.env.CONFLUENT_URL],
        ssl: {
          rejectUnauthorized: true
        },
        sasl: {
          mechanism: 'plain',
          username: process.env.CONFLUENT_USERNAME,
          password: process.env.CONFLUENT_PASSWORD
        },
        clientId: 'e2e-gateway-test', // can we change this? what is this?
      })
    }
}

async function getKafkaConsumer(target) {
  const client = getKafkaClient(target);
  const consumer = client.consumer({
    groupId: 'e2e-gateway-test' // can we change this? what is this?
  });
  await consumer.connect();
  return consumer;
};

async function getKafkaProducer(target) {
  const client = getKafkaClient(target);
  const producer = client.producer();
  await producer.connect();
  return producer;
}

async function getKafkaAdmin(target) {
  const client = getKafkaClient(target);
  const admin = client.admin();
  await admin.connect();
  console.log('Admin connected')
  return admin;
}

module.exports = {
  getKafkaConsumer,
  getKafkaProducer,
  getKafkaAdmin
}