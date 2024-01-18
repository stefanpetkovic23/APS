const amqp = require("amqplib");
const Group = require("../Models/groupModel");
const groups = {};
async function consumeTasks(groupId) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    const exchangeName = `group_tasks_${groupId}`;
    const queueName = `taskQueue_${groupId}`;

    await channel.assertExchange(exchangeName, "fanout", { durable: false });
    const q = await channel.assertQueue("", { exclusive: true });

    await channel.bindQueue(q.queue, exchangeName, groupId);

    console.log(`Task Consumer for group ${groupId} is waiting for tasks.`);

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        const parsedTask = JSON.parse(content);

        console.log(`Received task for group ${groupId}:`, parsedTask);

        if (!groups[groupId]) {
          groups[groupId] = { tasks: [] };
        }

        groups[groupId].tasks.push(parsedTask);

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error(`Error consuming tasks for group ${groupId}:`, error);
  }
}

// Eksportuj funkciju kako bi se mogla koristiti u drugim fajlovima
module.exports = consumeTasks;
