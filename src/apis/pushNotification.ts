import axios from "axios";

const url = "https://sendpushnotification-fmv7yprmfa-an.a.run.app";

export const pushNotification = async (
  fcmToken: string,
  name: string,
  message: string,
) => {
  await axios.post(url, { fcmToken, name, message });
};
