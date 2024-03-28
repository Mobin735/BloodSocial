importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDDm4WpIrjL1K4UE96Jgd-SPzG5dYXFqqY",
  authDomain: "bloodsocial.firebaseapp.com",
  projectId: "bloodsocial",
  storageBucket: "bloodsocial.appspot.com",
  messagingSenderId: "803302936262",
  appId: "1:803302936262:web:f07dd0578e4090fbc211c7",
  measurementId: "G-VW6GFXSYMV"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  // eslint-disable-next-line no-restricted-globals
  self.registration.hideNotification();
})

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});