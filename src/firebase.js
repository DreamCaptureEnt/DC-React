// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuWsg9PIlcjDtPT9H2W4Xox0WegS9_7Ro",
  authDomain: "graphtersdesign-c3750.firebaseapp.com",
  databaseURL: "https://graphtersdesign-c3750-default-rtdb.firebaseio.com",
  projectId: "graphtersdesign-c3750",
  storageBucket: "graphtersdesign-c3750.appspot.com",
  messagingSenderId: "341723653121",
  appId: "1:341723653121:web:d553bd76c161193a0acc00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app