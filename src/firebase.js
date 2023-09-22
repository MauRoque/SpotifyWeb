// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC3WBk6CdLeyHZwnNL7KqmyJEcPm1_kYx8",
  authDomain: "spotifymau-affcb.firebaseapp.com",
  projectId: "spotifymau-affcb",
  storageBucket: "spotifymau-affcb.appspot.com",
  messagingSenderId: "235528766076",
  appId: "1:235528766076:web:0c53c29857d2e6ffffbff9",
  measurementId: "G-7TXL8FKX1H",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const analytics = getAnalytics(firebaseApp);
export const obtainToken = setTokenFound => {
  return getToken(messaging, {
    vapidKey:
      "BC1i9k3B2tp2aJF2gJb0EeSYlvksANDUddqSb_4dCgjLU_VR1KjJhU1dASFGqm21LsV4LVJX_dKJYCoyrBYHUMc",
  })
    .then(currentToken => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch(err => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });

export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
