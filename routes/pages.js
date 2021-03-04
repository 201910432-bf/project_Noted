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

router.get("/note/:id", (req, res) => {
  const getID = req.params.id;
  console.log(commands.getData());
  res.render("main.component.ejs", {
    fetchData: commands.getData(),
    noteId: getID,
    tabKey: "note",
  });
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
  res.redirect("/note");
});

router.post("/savenote/note", (req, res) => {
  commands.insertData(
    req.query.arrayId,
    req.query.arrayValue,
    req.query.title,
    req.query.key
  );

  // res.send(
  //   req.query.arrayId +
  //     " " +
  //     req.query.arrayValue +
  //     " " +
  //     req.query.title +
  //     " " +
  //     req.query.key
  // );

  // res.redirect("/note");
});

router.get("/update/note", (req, res) => {
  commands.UpdateNote(
    req.query.noteName,
    req.query.noteKey,
    req.query.checkList,
    req.query.noteId
  );

  res.send(
    req.query.noteName +
      " " +
      req.query.noteKey +
      " " +
      req.query.checkList +
      " " +
      req.query.noteId
  );
});

router.get("/update/noteCheck", (req, res) => {
  commands.UpdateCheckNoteList(req.query.objectChecked, req.query.key);

  res.send(req.query.objectChecked + " " + req.query.key);
});

router.get("/update/noteList", (req, res) => {
  commands.UpdateNoteList(req.query.noteName, req.query.noteId);

  res.send(req.query.noteName + " " + req.query.noteId);
});

//export the router
module.exports = router;
