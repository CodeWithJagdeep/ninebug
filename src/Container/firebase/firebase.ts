// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2_W0YLYcC6xA1bpZUQhpp3Znc82Odqo8",
  authDomain: "mentorsland-8529d.firebaseapp.com",
  projectId: "mentorsland-8529d",
  storageBucket: "mentorsland-8529d.firebasestorage.app",
  messagingSenderId: "567818356567",
  appId: "1:567818356567:web:bdbf779220fa894a336012",
  measurementId: "G-J800XZCDQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

export { auth, googleProvider, githubProvider, analytics };
