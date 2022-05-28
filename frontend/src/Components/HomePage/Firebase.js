import firebase from "firebase";



var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5Hi5O5ODsGzQuLsj__E3LecmmoSTRzek",
    authDomain: "mobilly-invite.firebaseapp.com",
    projectId: "mobilly-invite",
    storageBucket: "mobilly-invite.appspot.com",
    messagingSenderId: "828075682004",
    appId: "1:828075682004:web:5a35293a7657af72b1f341",
});

var db = firebaseApp.firestore();

export { db };