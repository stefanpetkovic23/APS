const consumeMessages = require("../services/ActivityConsumer"); // Podesite putanju prema vašem consumer skriptu

// Poziv funkcije za konzumiranje poruka sa određenim groupId
const groupId = "6596f61d7d5d6d3d81dfd4f9"; // Zamijenite sa stvarnim groupId
consumeMessages(groupId)
  .then(() => {
    console.log(`Consumer for group ${groupId} started successfully.`);
  })
  .catch((error) => {
    console.error(`Error starting consumer for group ${groupId}:`, error);
  });
