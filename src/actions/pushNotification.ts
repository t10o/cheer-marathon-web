"use server";

import { messaging } from "@/libs/firebaseAdmin";

export async function sendPushNotification(
  fcmToken: string,
  name: string,
  message: string,
) {
  const notificationMessage = {
    notification: { title: name, body: message },
    token: fcmToken,
  };

  messaging
    .send(notificationMessage)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
