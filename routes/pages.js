const express = require("express");
const router = express.Router();
const commands = require("../controller/commands");

router.get("/", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: 0,
    tabKey: "note",
  });
});

router.get("/note", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: 0,
    tabKey: "note",
  });
});

router.get("/note/:id", (req, res) => {
  const getID = [req.params.id];
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: getID,
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
