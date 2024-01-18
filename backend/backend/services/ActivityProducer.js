const amqp = require("amqplib");

async function produceMessage(groupId, activityDetails) {
  try {
    const rabbitMQUrl = "amqp://localhost";

    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    // Generisanje imena izmene (exchange)
    const exchangeName = `group_messages_${groupId}1`;

    // Kreiranje izmene (exchange) ako ne postoji
    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    // Slanje poruke na određenu izmenu
    const message = {
      groupId,
      activityDetails,
    };

    const messageBuffer = Buffer.from(JSON.stringify(message));

    // Slanje poruke u izmenu
    await channel.publish(exchangeName, "", messageBuffer);

    console.log(`Poruka uspešno poslata u grupu ${groupId}.`);

    // Zatvaranje kanala i konekcije
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Greška prilikom slanja poruke u izmenu:", error);
  }
}

module.exports = produceMessage;
