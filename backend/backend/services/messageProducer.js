const amqp = require("amqplib");

async function produceChatMessage(chatId, messageContent) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    const exchangeName = `chat_messages_${chatId}`;

    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    const chatMessage = {
      chatId,
      messageContent,
    };

    const chatMessageBuffer = Buffer.from(JSON.stringify(chatMessage));

    await channel.publish(exchangeName, "", chatMessageBuffer);

    console.log(`Poruka uspešno poslata u čet ${chatId}.`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Greška prilikom slanja poruke u čet:", error);
  }
}

module.exports = produceChatMessage;
