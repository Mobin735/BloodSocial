import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

const { REACT_APP_VAPID_KEY } = process.env;

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Messaging service
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        const token = await getToken(messaging,{
            vapidKey: REACT_APP_VAPID_KEY,
        })
        console.log("Token: ",token);
    }
}

