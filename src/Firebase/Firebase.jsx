// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVW9kmnj7YYfe4Jat90vbHe64T-QUYilo",
  authDomain: "online-group-study-70c2a.firebaseapp.com",
  projectId: "online-group-study-70c2a",
  storageBucket: "online-group-study-70c2a.appspot.com",
  messagingSenderId: "773377383925",
  appId: "1:773377383925:web:848a16ab3f294d755a14bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;