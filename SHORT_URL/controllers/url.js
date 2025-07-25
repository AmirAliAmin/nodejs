const shortId = require("shortid")
const URL = require("../models/url")

async function handleGenerateNewURL(req,res) {
    const body = req.body;
    if(!body.url) {
        return res.status(404).json({ status: "fail", error: "Url is require" });
    }
    const ShortId = shortId();
    await URL.create({
        shortId: ShortId,
        redirectUrl :body.url,
        visitHistory:[]

    });

    return  res.json({id: ShortId})
}

module.exports = {
    handleGenerateNewURL
}