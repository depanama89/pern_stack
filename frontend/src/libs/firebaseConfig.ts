// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqtQiff8_SHfZbyAexgHxBx9ucfWuy9g4",
  authDomain: "pernstack-ee708.firebaseapp.com",
  projectId: "pernstack-ee708",
  storageBucket: "pernstack-ee708.firebasestorage.app",
  messagingSenderId: "1021800730520",
  appId: "1:1021800730520:web:ac7db32eda5bb2f29065ed",
  measurementId: "G-J5PN5HJRYE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
// const analytics = getAnalytics(app);
