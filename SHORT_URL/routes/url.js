const express = require("express");
const { handleGenerateNewURL } = require("../controllers/url");

const routes = express.Router();

routes.post("/", handleGenerateNewURL)

module.exports = routes