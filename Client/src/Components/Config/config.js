import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAREY4W9QgdJEunbiAdPOl7dWaA_Xe3C7U",
  authDomain: "reactecommerce-f2e74.firebaseapp.com",
  projectId: "reactecommerce-f2e74",
  storageBucket: "reactecommerce-f2e74.appspot.com",
  messagingSenderId: "199122416307",
  appId: "1:199122416307:web:e04aed207d2dd2d38db6c6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();

export {db};