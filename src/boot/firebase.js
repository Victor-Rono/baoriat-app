// import * as firebase from "@firebase/app";
import * as firebase from "firebase/app";
// import * as database from './firebase';
// import firebase from "firebase";
// import  "firebase/auth";
// import  "firebase/storage";
// import  "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAMjU5JIzQe0un_sHOZHVG0FTlRdRujZ8Y",
  authDomain: "baoriat-app.firebaseapp.com",
  databaseURL: "https://baoriat-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baoriat-app",
  storageBucket: "baoriat-app.appspot.com",
  messagingSenderId: "1047256852660",
  appId: "1:1047256852660:web:5813a558187ba1a7b0cfe1",
  measurementId: "G-J9R3ZXRYKN"
  };

  firebase.initializeApp(firebaseConfig);

  // db.collection("posts");
// let db = firebase.firestore();
// let auth  = firebase.auth();
// let storage = firebase.storage();
// let myData = "DATA";
import * as auth from "firebase/auth"
import * as storage from "firebase/storage"
import * as myDataBase from "firebase/database"
// import  db from "firebase/database"
import  "firebase/storage"
import { collection, doc, setDoc, getDocs, db} from "firebase/firestore";
// await getDocs(collection(db, "cities"));


let postsCollection = getDocs(collection(db, 'posts'));

  export default {firebase, db, auth, storage, myDataBase};


