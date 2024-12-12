// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_YKRl9Ew2reGhlW9fav0olS9Tw5X8j-Q",
  authDomain: "uber-project-c9ac9.firebaseapp.com",
  projectId: "uber-project-c9ac9",
  storageBucket: "uber-project-c9ac9.firebasestorage.app",
  messagingSenderId: "461440420915",
  appId: "1:461440420915:web:ae2805765d84770c37e746",
  measurementId: "G-0DKPN1JBD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);