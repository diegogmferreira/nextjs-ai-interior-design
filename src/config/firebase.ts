// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextjs-ai-interior-design.firebaseapp.com",
  projectId: "nextjs-ai-interior-design",
  storageBucket: "nextjs-ai-interior-design.firebasestorage.app",
  messagingSenderId: "14290608458",
  appId: "1:14290608458:web:cea734d64cbf94486fe1b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);