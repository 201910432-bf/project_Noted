const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

dotenv.config({ path: "./.env" });

const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//for using an ejs engine
// app.set("views", path.join(__dirname, "viewsFolder")); //if you want to use diff name other that views folder
app.set("view engine", "ejs");

//for styling create variable for getting the data
const assetDirectory = path.join(__dirname, "./assets");
const assetImgDirectory = path.join(__dirname, "./assets/images");
const assetIconFontDirectory = path.join(
  __dirname,
  "./node_modules/material-design-icons/iconfont/"
);
const controllerDirectory = path.join(__dirname, "./controller");

//fetching assets data
app.use("/assets", express.static(assetDirectory));
app.use("/images", express.static(assetImgDirectory));
app.use(
  "/node_modules/material-design-icons/iconfont/",
  express.static(assetIconFontDirectory)
);
app.use("/controller", express.static(controllerDirectory));

/**
 *
 * login fetchdatas
 *
 */

const loginCssDirectory = path.join(__dirname, "./LoginPage/css");
const loginImgDirectory = path.join(__dirname, "./LoginPage/images");
const loginResDirectory = path.join(__dirname, "./LoginPage/responsive");
const loginJsDirectory = path.join(__dirname, "./LoginPage/js");

app.use("/css", express.static(loginCssDirectory));
app.use("/images", express.static(loginImgDirectory));
app.use("/responsive", express.static(loginResDirectory));
app.use("/js", express.static(loginJsDirectory));

//getting the routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

//running server @ port 5000
app.listen(5000, () => {
  console.log("Server listening on Port 5000");
});
