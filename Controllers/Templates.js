const Template = require("../Models/Template");

exports.addTemplate = async (req, res) => {
    try {
        const Templatedata = await new Template({
            Category: req.body.Category,
            Thumbnail: req.body.Thumbnail,
            urlToImage: req.body.Urls,
            Texts: req.body.Texts
        });
        await Templatedata.save();
        res.json({ status: "success" });
    } catch (err) {
        console.log(err)
        res.json({ status: "success", err });
    }
};

exports.getTemplate = async (req, res) => {
    try {
        Template.find().then((Templates) => {
            res.json({ status: "success", Templates });
        }).catch(err => {
            res.json({ status: "success", err });
        });
    } catch (err) {
        res.json({ status: "success", err });
    }
};