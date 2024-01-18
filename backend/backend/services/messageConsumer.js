const amqp = require("amqplib");

async function consumeChatMessages(chatId) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    const exchangeName = `chat_messages_${chatId}`;
    const queueName = `chatQueue_${chatId}`;

    await channel.assertExchange(exchangeName, "fanout", { durable: false });
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchangeName, "");

    console.log(`Consumer for chat ${chatId} is waiting for messages.`);

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        const parsedMessage = JSON.parse(content);

        console.log(`Received message for chat ${chatId}:`, parsedMessage);
      }
    });
  } catch (error) {
    console.error(`Error consuming messages for chat ${chatId}:`, error);
  }
}

// Eksportuj funkciju kako bi se mogla koristiti u drugim fajlovima
module.exports = consumeChatMessages;
