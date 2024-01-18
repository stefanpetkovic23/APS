const amqp = require("amqplib");

async function produceTask(groupId, taskDetails) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    // Generisanje imena izmene (exchange)
    const exchangeName = `group_tasks_${groupId}`;

    // Kreiranje izmene (exchange) i reda ako ne postoje
    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    // Slanje poruke na određenu izmenu
    const task = {
      groupId,
      taskDetails,
    };

    const taskBuffer = Buffer.from(JSON.stringify(task));

    // Slanje poruke u izmenu
    await channel.publish(exchangeName, "", taskBuffer);

    console.log(`Zadatak uspešno poslat u grupu ${groupId}.`);

    // Zatvaranje kanala i konekcije
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Greška prilikom slanja zadatka u izmenu:", error);
  }
}

module.exports = produceTask;
