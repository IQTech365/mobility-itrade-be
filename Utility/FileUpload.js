// const firebase = require("./FireBase");
// var defaultStorage = admin.storage();
// const uploadString = async (filedata, urlref) => {
//   let dataurl = "";
//   const ref = await firebase.storage().ref("Mob-invited/" + urlref);
//   await ref.put(filedata).then(async (snapshot) => {
//     console.log("fileuploaded");
//     await ref.getDownloadURL().then((url) => {
//       dataurl = url;
//     });
//   });
//   return dataurl;
// };
// const getString = async (urlref) => {
//   var url = await firebase
//     .storage()
//     .ref("Mob-invited/" + urlref)
//     .getDownloadURL();
//   return url;
// };

// exports.uploadString = uploadString;
