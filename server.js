const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

//for using an ejs engine
// app.set("views", path.join(__dirname, "viewsFolder")); //if you want to use diff name other that views folder
app.set("view engine", "ejs");

//for styling
const assetDirectory = path.join(__dirname, "./assets");
const assetImgDirectory = path.join(__dirname, "./assets/images");
const assetIconFontDirectory = path.join(
  __dirname,
  "./node_modules/material-design-icons/iconfont/"
);
const controllerDirectory = path.join(__dirname, "./controller");

app.use("/assets", express.static(assetDirectory));
app.use("/images", express.static(assetImgDirectory));
app.use(
  "/node_modules/material-design-icons/iconfont/",
  express.static(assetIconFontDirectory)
);
app.use("/controller", express.static(controllerDirectory));

//getting the routes
app.use("/", require("./routes/pages"));

//running server @ port 5000
app.listen(5000, () => {
  console.log("Server listening on Port 5000");
});
