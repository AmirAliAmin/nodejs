const express = require("express");
const { handleGenerateNewURL, handleGetAnalytics } = require("../controllers/url");

const routes = express.Router();

routes.post("/", handleGenerateNewURL)

routes.get("/analytics/:shortId", handleGetAnalytics)

module.exports = routes