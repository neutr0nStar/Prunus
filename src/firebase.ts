// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNlTHHOgL7vC3cJ6AJx-wji1i30GR9RyE",
  authDomain: "prunus-f5d97.firebaseapp.com",
  projectId: "prunus-f5d97",
  storageBucket: "prunus-f5d97.appspot.com",
  messagingSenderId: "244804934444",
  appId: "1:244804934444:web:fe9296a7df76cb3dba2a89",
  measurementId: "G-P1YWK0P17J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app