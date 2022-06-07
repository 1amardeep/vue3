import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfuWIvZuCwOrE3lgmUp3119JlOkkh9ALM",
  authDomain: "udemy-vue-cart.firebaseapp.com",
  projectId: "udemy-vue-cart",
  storageBucket: "udemy-vue-cart.appspot.com",
  messagingSenderId: "547968312429",
  appId: "1:547968312429:web:7a4fbdf61de81e92268b64",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firestore service

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timeStamp, projectAuth };
