import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyD__n11NKPxKln3ckHewNHQKGY0hyzUNmc",
    authDomain: "chatcity-75942.firebaseapp.com",
    projectId: "chatcity-75942",
    storageBucket: "chatcity-75942.appspot.com",
    messagingSenderId: "397577086125",
    appId: "1:397577086125:web:41e605b9c8ff7fa7e45224",
  })
  .auth();
