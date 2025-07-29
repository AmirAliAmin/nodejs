const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true }); // ✅ correct spelling

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
