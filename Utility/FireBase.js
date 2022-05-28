var admin = require("firebase-admin");

var serviceAccount = require("./mobilly-invite-firebase-adminsdk-06odd-3af0b2cf67.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mobilly-invite.appspot.com",
});
// Initialize firebase admin SDK

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = bucket;

// import firebase from "firebase/app";
// import "firebase/storage";

// export function uploadString(message, imageid, eid, extension) {
//   const ref = firebase
//     .storage()
//     .ref()
//     .child("mobi-invited" + eid + "/" + imageid + "." + extension);
//   ref.putString(message, "data_url").then((snapshot) => {
//     return true;
//   });
// }
// export function getString(message, imageid, eid, extension) {
//   var pathReference = storage.ref.child(
//     "mobi-invited" + eid + "/" + imageid + "." + extension
//   );

//   pathReference.getDownloadURL().then((url) => {
//     return url;
//   });
// }
