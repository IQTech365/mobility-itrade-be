// const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const vtoken = process.env.verifytoken;
// const client = require("twilio")(accountSid, authToken);
// let vid = "";
// const initverify = async (reciver, res) => {
//   console.log(reciver, accountSid, authToken);
//   await client.verify.services
//     .create({ friendlyName: "Mob-inv" })
//     .then((service) => {
//       console.log(service.sid);
//       vid = service.sid;
//     })
//     .catch((error) => {
//       console.log(error)
//       res.json({ status: "checked", response: error });
//     });

//   await client.verify
//     .services(vtoken)
//     .verifications.create({ to: reciver, channel: "sms" })
//     .then((verification) => {
//       console.log(verification);
//       console.log("sms sent");
//       res.json({ status: "pending", response: verification, vtoken });
//     })
//     .catch((error) => {
//       res.json({ status: "checked", response: error });
//     });
// };
// const verifytoken = async (phone, code, res) => {
//   await client.verify
//     .services(vtoken)
//     .verificationChecks.create({ to: phone, code: code })
//     .then((verification_check) => {
//       console.log(verification_check);
//       res.json({ status: "checked", response: verification_check.status });
//     })
//     .catch((error) => {
//       res.json({ status: "checked", response: error });
//     });
// };

// const sendsms = async (reciever, body) => {
//   client.messages
//     .create({ from: "+18703962161", body: body, to: reciever })
//     .then((message) => console.log(message.sid));
// };
// const sendtowatsapp = async (recievers, body) => {
//   Promise.all(
//     recievers.map((number) => {
//       if (number.toString().length <= 10) {
//         // console.log("whatsapp: +91" + number);
//         return client.messages.create({
//           body: body,
//           from: "whatsapp:+14155238886",
//           to: "whatsapp:+91" + number,
//         });
//       } else {
//         return client.messages.create({
//           body: body,
//           from: "whatsapp:+14155238886",
//           to: "whatsapp:" + number,
//         });
//       }
//     })
//   )
//     .then((messages) => {
//       console.log("Messages sent!");
//     })
//     .catch((err) => console.error(err));
// };

// exports.initverify = initverify;
// exports.verifytoken = verifytoken;
// exports.sendsms = sendsms;
// exports.sendtowatsapp = sendtowatsapp;
