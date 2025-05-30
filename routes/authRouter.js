const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

//user logout
router.get("/logout", authController.logoutUser);

module.exports = router;
