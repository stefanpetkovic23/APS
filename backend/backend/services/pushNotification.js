const admin = require("firebase-admin");

function initializeFirebaseAdmin() {
  const serviceAccount = require("../services/admin.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function sendFCMPushNotification(groupDeviceTokens, title, body) {
  try {
    const responses = await Promise.all(
      groupDeviceTokens.map(async (deviceToken) => {
        const message = {
          data: {
            title,
            body,
          },
          token: deviceToken,
        };

        return await admin.messaging().send(message);
      })
    );

    console.log("Notifikacije uspešno poslate:", responses);
  } catch (error) {
    console.error("Greška prilikom slanja notifikacija:", error);
  }
}

module.exports = {
  initializeFirebaseAdmin,
  sendFCMPushNotification,
};
