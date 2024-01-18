const amqp = require("amqplib");

async function connectToRabbitMQ() {
  try {
    // Podesite URL RabbitMQ servera
    const rabbitMQUrl = "amqp://localhost";

    // Uspostavite konekciju
    const connection = await amqp.connect(rabbitMQUrl);

    // Otvorite kanal
    const channel = await connection.createChannel();

    console.log("Konekcija sa RabbitMQ serverom uspešno uspostavljena.");

    // Zatvorite kanal i konekciju nakon završetka
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(
      "Greška prilikom uspostavljanja konekcije sa RabbitMQ serverom:",
      error
    );
  }
}

connectToRabbitMQ();
