const express = require("express");
const router = express.Router();
const commands = require("../controller/commands");

router.get("/", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    message: "hello from server",
    tabKey: "note",
  });
});

const sampleData = [
  {
    title: "assignment",
    list: "new,assignment,newnew,test,tesing..",
    listKeys: "1,2,3,4,5",
  },
];

router.get("/note", (req, res) => {
  // console.log(commands.getData());
  console.log(sampleData);

  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    listData: sampleData,
    message: "hello from server",
    tabKey: "note",
  });
});

router.get("/idea", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    message: "hello from server",
    tabKey: "idea",
  });
});

module.exports = router;
