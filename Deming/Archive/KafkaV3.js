require('dotenv').config();
const { Kafka } = require('kafkajs')

class ConnectKafka {

  static kafka;
  static consumer;

  static async getKafka(broker, id) {
    ConnectKafka.kafka = new Kafka({
      clientId: id,
      brokers: broker,
      ssl: {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined,
      },
      sasl: {
        mechanism: 'scram-sha-512',
        username: process.env.GATEWAY_USERNAME,
        password: process.env.GATEWAY_PASSWORD
      },
    })

  }

  static async sendMessage(broker, id, topic, message) {
    const producer = ConnectKafka.kafka.producer()
    await producer.connect()
    // await producer.send({
    //   topic: topic,
    //   messages: [{
    //     value: message
    //   }]
    // })
    await producer.send({
      topic: 'rovr.log',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })

    await producer.disconnect()
  }

  static async subscribeToTopic(id, topic, sentMessage) {
    const consumer = ConnectKafka.kafka.consumer({ groupId: id })

    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: false })

    await consumer.run({
      eachMessage: async ({ topic, partition, receivedMessage }) => {
        console.log(receivedMessage)
        if (receivedMessage === sentMessage)
        {
          console.log('message sent succesfully ')
          ConnectKafka.messageWasReceived = true;
        }


      },
    })

    ConnectKafka.consumer = consumer;
  }

  static cleanup() {
    if (ConnectKafka.consumer)
    {
      ConnectKafka.consumer.disconnect();
      ConnectKafka.messageWasReceived = false;
    }
  }
}


module.exports = {
  ConnecttttKafka: ConnectKafka
}