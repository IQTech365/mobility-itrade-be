const mongoose = require("mongoose");
const TemplateSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
    },
    Thumbnail: { type: String, required: true },
    urlToImage: [
        {
            type: Object,
            required: true,
        },
    ],
    Texts: [
        {
            type: Object,
            required: true,
        },
    ],
});
module.exports = mongoose.model("Template", TemplateSchema);
