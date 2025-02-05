// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJComwtLEjdXjxSl37KmOH9tU6zM5hkQQ",
  authDomain: "solentsocial-55341.firebaseapp.com",
  projectId: "solentsocial-55341",
  storageBucket: "solentsocial-55341.firebasestorage.app",
  messagingSenderId: "194148932525",
  appId: "1:194148932525:web:5407bfdc6a8211af2c9f24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const db = getFirestore(app);