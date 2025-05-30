const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const urlController = require("../controllers/urlController");

router.get("/", urlController.getHomePage);

router.post("/shorten", authMiddleware, urlController.shortenUrl);

router.get("/:shortId", urlController.redirectUrl);

router.get("/analytics/:shortId", authMiddleware, urlController.getAnalytics);

module.exports = router;
