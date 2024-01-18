const consumeTasks = require("../services/TodoConsumer"); // Podesite putanju prema vašem consumer skriptu

// Poziv funkcije za konzumiranje poruka sa određenim groupId
const groupId = "6596f61d7d5d6d3d81dfd4f9"; // Zamijenite sa stvarnim groupId
consumeTasks(groupId)
  .then(() => {
    console.log(`Consumer for group ${groupId} started successfully.`);
  })
  .catch((error) => {
    console.error(`Error starting consumer for group ${groupId}:`, error);
  });
