require('jest');
require('dotenv').config();
const { ConnecttttKafka } = require('./../Client/KafkaV3')
const { nanoid } = require('nanoid');
const { Kafka } = require('kafkajs');

describe('Name of the group', () => {
  const id = 'sendMessage';
  const topic = 'rovr.log';
  const nanoId = nanoid();
  const msg = JSON.stringify({ meta: { testId: nanoId }, data: {} });
  beforeAll(() => {
    ConnecttttKafka.getKafka(
      [process.env.GATEWAY_HOST + ':30100'],
      id
    );
  })
  it('should send message and receive', async () => {
    await ConnecttttKafka.subscribeToTopic(id, topic, msg)
    await ConnecttttKafka.sendMessage(id, topic, msg);
    expect(ConnecttttKafka.messageWasReceived).toEqual(true)
    await ConnecttttKafka.cleanup()
  });

  afterEach(async () => {
    await ConnecttttKafka.cleanup();
  })
});