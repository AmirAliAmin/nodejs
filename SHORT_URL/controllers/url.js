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
    return res.render("home", {
        id: ShortId
    })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId})
    return res.json({totalClick :result.visitHistory.length, analytic:result.visitHistory})
    
}

module.exports = {
    handleGenerateNewURL,
    handleGetAnalytics
}