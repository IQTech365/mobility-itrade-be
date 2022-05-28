import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyA5Hi5O5ODsGzQuLsj__E3LecmmoSTRzek",
  authDomain: "mobilly-invite.firebaseapp.com",
  projectId: "mobilly-invite",
  storageBucket: "mobilly-invite.appspot.com",
  messagingSenderId: "828075682004",
  appId: "1:828075682004:web:5a35293a7657af72b1f341",
  measurementId: "G-KX6SQRPLCB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.storage();
export default firebase;
