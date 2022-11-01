// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPHMlIW7pzd-NJQHOQTLDuhLQPZEgNua0",
    authDomain: "kamus-nostalgia.firebaseapp.com",
    projectId: "kamus-nostalgia",
    storageBucket: "kamus-nostalgia.appspot.com",
    messagingSenderId: "881946896893",
    appId: "1:881946896893:web:34a503f0d3cb8ce4005194"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);