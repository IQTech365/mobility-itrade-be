
const axios = require("axios");
const url = "https://api.interakt.ai/v1/public/track";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Basic RG14bzJWcnpYME5JaEMxd2c5SDl5M0dkbFZtdUZwWjFHelplbDFCcWx5STo="
}
const setUser = async (req, res) => {
    axios.post(url + '/users/', req, {
        headers: headers
    })
        .then(function (response) {

            return "added to watsapp Api"
        })
        .catch(function (error) {
            console.log(error)
            return "cant add  to watsapp Api"
        });
}


const nORsvp = async (req) => {
    axios.post(url + '/users/', {
        phoneNumber: req.phone.split("+91")[1],
        traits: {
            rsvp: true,
            file: req.file,
            rsvpmsg: req.msg + ". " + req.link,
        }
    }, {
        headers: headers
    })
        .then(function (response) {

            return "added to watsapp Api"
        })
        .catch(function (error) {
            console.log(error)
            return "cant add  to watsapp Api"
        });
}

const giftAvailable = async (req) => {
    axios.post(url + '/users/', {
        phoneNumber: req.phone.split("+91")[1],
        traits: {
            gift: true,
            file: req.file,
            giftmsg: req.msg + ". " + req.link,

        }
    }, {
        headers: headers
    })
        .then(function (response) {

            return "added to watsapp Api"
        })
        .catch(function (error) {
            console.log(error)
            return "cant add  to watsapp Api"
        });
}

const eventRemainder = async (req) => {
    axios.post(url + '/users/', {
        phoneNumber: req.phone.split("+91")[1],
        traits: {
            remind: true,
            file: req.file,
            remindmsg: req.msg + ". " + req.link,
        }
    }, {
        headers: headers
    })
        .then(function (response) {

            return "added to watsapp Api"
        })
        .catch(function (error) {
            console.log(error)
            return "cant add  to watsapp Api"
        });
}
const NoNotification = async (req) => {
    axios.post(url + '/users/', {
        phoneNumber: req.phone.split("+91")[1],
        traits: {
            remind: false,
            remindmsg: "",
            gift: false,
            giftmsg: "",
            rsvp: false,
            rsvpmsg: "",
            msg: "",
            invitations: "",
            norsvp: "",
            file: "",
        }
    }, {
        headers: headers
    })
        .then(function (response) {

            return "added to watsapp Api"
        })
        .catch(function (error) {
            // console.log(error)
            return "cant add  to watsapp Api"
        });
}
exports.setUser = setUser;
exports.nORsvp = nORsvp;
exports.giftAvailable = giftAvailable;
exports.eventRemainder = eventRemainder;
exports.NoNotification = NoNotification;