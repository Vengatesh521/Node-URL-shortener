const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/auth/login"); // Redirect to login if token is not present
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.redirect("/auth/login");
  }
};
