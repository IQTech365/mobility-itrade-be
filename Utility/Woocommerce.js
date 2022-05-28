const path = require("path");
const dotenv = require("dotenv");
var WooCommerceAPI = require('woocommerce-api');

const getgifts = async (endpoint, res) => {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });
    let url = process.env.GiftShopUrl;
    let consumerKey = process.env.GiftShopconsumerKey;
    let consumerSecret = process.env.GiftShopconsumerSecret;
    console.log(url)
    console.log(consumerKey)
    console.log(consumerSecret)
    try {
        var WooCommerce = await new WooCommerceAPI({
            url: url,
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            wpAPI: true,
            version: 'wc/v3'
        });
        WooCommerce.getAsync(endpoint).then(function (result) {
            let alldata = JSON.parse(result.toJSON().body);
            //  console.log(alldata)
            res.json({ status: 'success', alldata: alldata })
        }).catch(err => {
            console.log(err);
            res.json({ status: "failed", err: err });
        });
    } catch (err) {
        console.log(err);
        res.json({ status: "failed", err: err });
    }
}
exports.getgifts = getgifts;