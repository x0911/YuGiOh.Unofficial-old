import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC5o1NbARwr9Yezhon7HBi8lljzS7b3eu8",
  authDomain: "yugioh-unofficial.firebaseapp.com",
  databaseURL: "https://yugioh-unofficial.firebaseio.com",
  projectId: "yugioh-unofficial",
  storageBucket: "yugioh-unofficial.appspot.com",
  messagingSenderId: "864907709175",
  appId: "1:864907709175:web:14b6016fe5baea96c261f2",
  measurementId: "G-Z8PELMY8KK"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .then(() => {
    // console.log("Multi Tab Persistance");
  })
  .catch(error => {
    if (error.code == "failed-precondition") {
      // console.log(
      //   "Multiple tabs open, persistence can only be enabled in one tab at a a time."
      // );
    } else if (error.code == "unimplemented") {
      // console.log(
      //   "The current browser does not support all of the features required to enable persistence"
      // );
    }
  });

// firebase utils
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const functions = firebase.functions();
const currentUser = auth.currentUser;

// firebase collections
const app = db.collection("app");
const users = db.collection("users");
const decks = db.collection("decks");
const cards = db.collection("cards");

export {
  firebase,
  auth,
  db,
  storage,
  storageRef,
  functions,
  currentUser,
  app,
  users,
  decks,
  cards
};
