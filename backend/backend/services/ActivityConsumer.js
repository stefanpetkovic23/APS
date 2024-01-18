const amqp = require("amqplib");

async function consumeMessages(groupId) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    const exchangeName = `group_messages_${groupId}1`;
    const queueName = `activityQueue_${groupId}`;

    await channel.assertExchange(exchangeName, "fanout", { durable: false });
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchangeName, groupId);

    console.log(`Consumer for group ${groupId} is waiting for messages.`);

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        const parsedMessage = JSON.parse(content);

        console.log(`Received message for group ${groupId}:`, parsedMessage);
      }
    });
  } catch (error) {
    console.error(`Error consuming messages for group ${groupId}:`, error);
  }
}

// Export the function so it can be used in other files
module.exports = consumeMessages;
