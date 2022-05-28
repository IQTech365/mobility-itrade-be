const Events = require("../Models/Events");
const amazonPaapi = require('amazon-paapi');
const dotenv = require("dotenv");
exports.getGift = async (req, res) => {
    try {
        console.log("query: ");
        console.log(req.body);
        const commonParameters = {
            'AccessKey': 'AKIATTE4NN3GGX3BKNVW',
            'SecretKey': 'jJzVVybrHf275hQjZP/gb9blmnzh06MVpGGwLn4G',
            'PartnerTag': 'Minvitd-03', // yourtag-20
            'PartnerType': 'Associates', //  Default value is Associates. 
            'Marketplace': 'www.amazon.in' // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
        }

        const requestParameters = {
            'Keywords': req.body.query,
            'ItemCount': 20,
            'Resources': ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price']
        };

        // console.log(commonParameters, requestParameters)
        amazonPaapi.SearchItems(commonParameters, requestParameters)
            .then(data => {
                // do something with the success response.
                console.log(data);
                res.json({ status: "success", data: data });
            })
            .catch(error => {
                // catch an error.
                console.log(error)
            });
    } catch (error) {
        res.json({ status: "failed", err: err });
        console.log(error)
    }
}
exports.saveGift = async (req, res) => {
    try {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Events.findByIdAndUpdate(req.body.Id, {
            GiftList: req.body.GiftList,
        },
            options).then(data => {
                res.json({ status: "success", data: data });
            }).catch(err => {
                res.json({ status: "failed", err: err });
                console.log(error)
            })
    } catch (err) {
        res.json({ status: "failed", err: err });
        console.log(error)
    }
}