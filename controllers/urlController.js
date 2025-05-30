const shortid = require("shortid");

const URL = require("../models/urlModel");
const e = require("express");

exports.getHomePage = async (req, res) => {
  try {
    const urls = await URL.find();
    res.render("index", { urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const shortCode = shortid.generate();
    await URL.create({
      originalUrl,
      shortCode,
      visitedHistory: [],
    });
    return res.redirect("/api");
    // return res.json({ shortCode });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await URL.findOne({ shortCode: shortId });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    const visitedEntry = {
      visitCount: url.visitedHistory.length + 1,
      visitTime: new Date(),
    };

    url.visitedHistory.push(visitedEntry);
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error finding URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await URL.findOne({ shortCode: shortId });

    if (url) {
      res.render("urlDetails", { url });
    } else {
      return res.status(404).render("error", { error: "URL not found" });
    }

    // if (!url) {
    //   return res.status(404).json({ error: "URL not found" });
    // }

    // return res.status(200).json({
    //   totalClicks: url.visitedHistory.length,
    //   analytics: url.visitedHistory,
    // });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
