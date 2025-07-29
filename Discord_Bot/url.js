const shortId = require("shortid");
const URL = require("./model/url");

async function generateShortUrl(inputUrl) {
    const ShortId = shortId();

    const newUrl = await URL.create({
        shortId: ShortId,
        redirectUrl: inputUrl,
        visitHistory: [],
    });

    return ShortId;
}

module.exports = {
    generateShortUrl,
};
