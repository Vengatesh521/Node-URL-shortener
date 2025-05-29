const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.get("/", urlController.getHomePage);

router.post("/shorten", urlController.shortenUrl);

router.get("/:shortId", urlController.redirectUrl);

router.get("/analytics/:shortId", urlController.getAnalytics);

module.exports = router;
