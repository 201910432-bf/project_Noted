const express = require("express");
const router = express.Router();
const commands = require("../controller/commands");

//when open just fetch the first value of note
router.get("/", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: 0,
    tabKey: "note",
  });
});

//when click note button show the first value of note
router.get("/note", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: 0,
    tabKey: "note",
  });
});

//get data of note ID = ?
router.get("/note/id", (req, res) => {
  const getID = req.query.id;
  res.send([{ command: commands.getData(), noteId: getID }]);
});

//go to idea tab
router.get("/idea", (req, res) => {
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    message: "hello from server",
    tabKey: "idea",
  });
});

router.get("/createNote/note", (req, res) => {
  const noteName = req.query.notename;
  commands.insertNote(noteName);
  res.send(noteName);
});

router.get("/savenote/:data/:idKeyData/:valueData", (req, res) => {
  commands.insertData(req.params.data);
  res.send(
    req.params.data + " " + req.params.idKeyData + " " + req.params.valueData
  );
  // res.redirect("/note");
});

//export the router
module.exports = router;
