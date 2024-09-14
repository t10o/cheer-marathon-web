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

  messaging.send(notificationMessage).catch((error) => {
    throw new Error(error);
  });
}
