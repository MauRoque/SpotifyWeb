// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyC3qsotP2brNv32UDmpoVz5yiZ5RGccT1c",

  authDomain: "desarrollonube-56d59.firebaseapp.com",

  projectId: "desarrollonube-56d59",

  storageBucket: "desarrollonube-56d59.appspot.com",

  messagingSenderId: "1090131167729",

  appId: "1:1090131167729:web:2f9a8243a5fd4d13851c50",

  measurementId: "G-M258ZE5LB4",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
