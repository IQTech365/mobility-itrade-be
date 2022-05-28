var express = require("express");
const app = require("express")();
var cron = require('node-cron');
const server = require("http").createServer(app);
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoute = require("./Routes/Auth.js");
const TemplateRoute = require("./Routes/Template");
const eventRoute = require("./Routes/Event.js");
const chatRoute = require("./Routes/ChatGroup.js");
const Notification = require("./Routes/Notification");
const postRoute = require("./Routes/Post");
const adminRoute = require("./Routes/Admin")
const eventcontroller = require("./Controllers/EventController.js");
const path = require("path");
dotenv.config();
const cors = require("cors");
const socketmesage = require("./Utility/Socket");
mongoose.set("useFindAndModify", false);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection has occured " + err + " error");
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection is disconnected");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/template", TemplateRoute);
app.use("/api/event", eventRoute);
app.use("/api/chatgroup", chatRoute);
app.use("/api/notification", Notification);
app.use("/api/post", postRoute);
app.use("/api/admin", adminRoute);
app.use(express.static("frontend/build"));
app.get("/hi", function (req, res) {
  res.send("hi");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const io = require("socket.io")(server);
io.on("connection", function (socket) {
  socketmesage.socketmesage(socket, io);
});
cron.schedule('30 9 * * *', () => {
  var d = new Date();
  console.log(d.toLocaleTimeString());
  eventcontroller.clearall();
});
cron.schedule('15 1 * * *', () => {
  var d = new Date();
  console.log(d.toLocaleTimeString());
  eventcontroller.Notifyall();
});
server.listen(process.env.PORT || 5000, async () => {
  console.log("server:http://localhost:5000/");
  // await eventcontroller.clearall();
  // await eventcontroller.Notifyall();
}
);
