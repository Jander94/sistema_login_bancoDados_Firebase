import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDk5zmnI8F98aJtpT6qXHP_wm0lWTPfFoI",
    authDomain: "sistema-5bc11.firebaseapp.com",
    projectId: "sistema-5bc11",
    storageBucket: "sistema-5bc11.appspot.com",
    messagingSenderId: "858392130384",
    appId: "1:858392130384:web:949863ad62dbea60e0b255",
    measurementId: "G-LVMGX56K9L"
  };
  if(!firebase.app.length){
    firebase.initializeApp(firebaseConfig);    
  }

export default firebase;