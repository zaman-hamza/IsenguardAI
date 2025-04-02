import * as firebase from "firebase/app";
import "firebase/auth";

// if (!process.env.REACT_APP_FIREBASE_CONFIG) {
//   console.error("REACT_APP_FIREBASE_CONFIG must be defined");
//   console.log("ENV: ", process.env);
// }
// const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
const firebaseConfig = {
  apiKey: "AIzaSyDfEQY7GIluHZodJQWDr8bRcCcWh2NZdgI",
  authDomain: "isenguardai.firebaseapp.com",
  projectId: "isenguardai",
  storageBucket: "isenguardai.appspot.com",
  messagingSenderId: "475382712283",
  appId: "1:475382712283:web:c94974b9edcbaeb67189fe",
  measurementId: "G-MDFP1CMRYJ"
};
export function initialize() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export function attachAuthListener(handler) {
  return firebase.auth().onAuthStateChanged(user => {
    handler(user);
  });
}

export async function createNewUser(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  await firebase.auth().signOut();
}
