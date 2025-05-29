const express = require("express");
const mongoose = require("mongoose");
const urlRouter = require("./routes/urlRouter");

const app = express();
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", urlRouter);

const Port = 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
