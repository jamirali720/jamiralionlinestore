// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYF0oqrdpTSlKVD5FOnSD9MT2c5GNvBCQ",
  authDomain: "jamiralionlinemarket.firebaseapp.com",
  projectId: "jamiralionlinemarket",
  storageBucket: "jamiralionlinemarket.firebasestorage.app",
  messagingSenderId: "149973505766",
  appId: "1:149973505766:web:cbca753fe5ae02ce67cd27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;