const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const session = require("express-session");

const conn = require("../conn");

const router = express.Router();
const commands = require("../controller/commands");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(
  session({
    secret: "secretKamote",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: true,
    saveUninitialized: true,
  })
);

//when open just fetch the first value of note
router.get("/", async (req, res) => {
  if (req.session && req.session.auth && req.session.auth.userId) {
    res.render("main.component.ejs", {
      fetchData: await commands.getData(),
      noteId: 0,
      tabKey: "note",
      userId: req.session.auth.userId,
      userName: req.session.auth.userName,
    });
  } else {
    res.redirect("/login");
  }
});

//when click note button show the first value of note
router.get("/note", async (req, res) => {
  if (req.session && req.session.auth && req.session.auth.userId) {
    res.render("main.component.ejs", {
      fetchData: await commands.getData(),
      noteId: 0,
      tabKey: "note",
      userId: req.session.auth.userId,
      userName: req.session.auth.userName,
    });
  } else {
    res.redirect("/login");
  }
});

//get data of note ID = ?
router.get("/note/id", (req, res) => {
  const getID = req.query.id;
  console.log(getID + " the id");
  res.send([{ command: commands.getData(), noteId: getID }]);
});

router.get("/note/:id", (req, res) => {
  const getID = req.params.id;

  if (req.session && req.session.auth && req.session.auth.userId) {
    res.render("main.component.ejs", {
      fetchData: commands.getData(),
      noteId: getID,
      tabKey: "note",
      userId: req.session.auth.userId,
      userName: req.session.auth.userName,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/createNote/note", (req, res) => {
  const noteName = req.query.notename;
  const lvlprio = req.query.lvlprio;
  const noteMonth = req.query.noteMonth;
  const noteDay = req.query.noteDay;
  const noteYear = req.query.noteYear;
  const listKey = req.query.listKey;

  const date = new Date(noteYear + "-" + noteMonth + "-" + noteDay);
  const deadline = date.toLocaleDateString("en", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });

  console.log(deadline); // end here

  commands.insertNote(noteName, res, req, listKey);
  // res.send("nice baby");
});

router.get("/remove/note", (req, res) => {
  const idNote = req.query.noteId;

  commands.removeNote(idNote, res);
  // res.send(idNote);
  // res.redirect("/note");
});

router.post("/savenote/note", (req, res) => {
  commands.insertData(
    req.query.arrayId,
    req.query.arrayValue,
    req.query.title,
    req.query.key
  );

  res.send(
    req.query.arrayId +
      " " +
      req.query.arrayValue +
      " " +
      req.query.title +
      " " +
      req.query.key
  );

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

/**
 *
 *        Idea TAB
 *
 *
 *
 *
 */

//go to idea tab
router.get("/idea", (req, res) => {
  if (req.session && req.session.auth && req.session.auth.userId) {
    res.render("main.component.ejs", {
      fetchData: commands.getDataIdea(),
      noteId: 0,
      tabKey: "idea",
      userId: req.session.auth.userId,
      userName: req.session.auth.userName,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/createIdea/idea", (req, res) => {
  const ideaName = req.query.ideaname;
  const ideaKey = req.query.ideaKey;

  console.log(ideaName + " idea nameee");

  commands.insertIdea(ideaName, req, res, ideaKey);
  // res.redirect("/idea/" + ideaKey);
});

router.get("/idea/id", (req, res) => {
  const getID = req.query.id;
  res.send([{ command: commands.getDataIdea(), noteId: getID }]);
});

router.get("/idea/:id", (req, res) => {
  const getID = req.params.id;

  if (req.session && req.session.auth && req.session.auth.userId) {
    res.render("main.component.ejs", {
      fetchData: commands.getDataIdea(),
      noteId: getID,
      tabKey: "idea",
      userId: req.session.auth.userId,
      userName: req.session.auth.userName,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/update/ideaData", (req, res) => {
  commands.getDataIdea();
  commands.UpdateIdeaData(req.query.ideaData, req.query.key);
  res.send(req.query.ideaData);
});

router.get("/remove/idea", (req, res) => {
  const idIdea = req.query.idIdea;

  commands.removeIdea(idIdea, res);
  // res.send(idNote);
  // res.redirect("/note/" + 0);
});

/**
 *
 *
 * Login User
 *
 *
 */

router.get("/login", (req, res) => {
  if (req.session && req.session.auth && req.session.auth.userId) {
    res.redirect("/note");
  } else {
    res.render("Slogin.component.ejs");
  }
});

function hash(input, salt) {
  const key = crypto.pbkdf2Sync(input, salt, 1000, 30, "sha512");
  return ["pbkdf2", "1000", salt, key.toString("hex")].join("$");
}

router.get("/hash/:input", (req, res) => {
  var hashedString = hash(req.params.input, "secretSauce");
  res.send(hashedString);
});

router.post("/create/user", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const Cpassword = req.body.Cpassword;

  const salt = crypto.randomBytes(128).toString("hex");
  const userPassword = hash(password, salt);
  const userCPassword = hash(Cpassword, salt);

  commands.createUser(username, email, userPassword, userCPassword, res, req);
});

router.post("/login/auth", (req, res) => {
  const email = req.body.email;
  const userPassword = req.body.password;

  commands.loginUser(email, userPassword, res, req);
});

router.get("/login/auth-check", (req, res) => {
  if (req.session && req.session.auth && req.session.auth.userId) {
    res.send("You are logged in: " + req.session.auth.userId.toString());
  } else {
    res.send("You are not logged in");
  }
});

router.get("/logout", (req, res) => {
  delete req.session.auth;
  res.send("You are logged out");
});

//export the router
module.exports = router;
