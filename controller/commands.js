const conn = require("../conn");

const crypto = require("crypto");

var data;
var dataIdea;

const date = new Date();
const todayTime = date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});
const todayDate = date.toLocaleDateString("en", {
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "numeric",
});

const nowDate = todayDate + ", " + todayTime;

const insertData = (arrayId, arrayValues, title, key) => {
  console.log(arrayId, arrayValues, "throw from commands");

  const record = [title, arrayValues, arrayId, nowDate, key];

  const queryString =
    "UPDATE note_table SET note_title=?, note_list=?, note_keys=?, note_updateDate=? WHERE id=?  ";
  conn.db.query(queryString, record, (err, result) => {
    if (err) throw err;
    else console.log("success");
    getData();
  });
};

const insertNote = (note, req) => {
  const queryString = `INSERT INTO note_table (note_title, note_insertDate, note_updateDate, userId) VALUES ('${note}', '${nowDate}', '${nowDate}', ${req.session.auth.userId}) `;
  conn.db.query(queryString, (err, result) => {
    if (err) console.log("Failed", err);
    else console.log("Added Success! ");
    getData();
  });
};

const removeNote = (noteId) => {
  const queryString = `DELETE FROM note_table WHERE id = '${noteId}'`;
  conn.db.query(queryString, (err, result) => {
    if (err) console.log("Failed", err);
    else console.log("Remove Success! ");
    getData();
  });
};

const UpdateNote = (checkedData, arrayId, arrayValues, noteId) => {
  console.log("from command");
  console.log(checkedData, arrayId, arrayValues, noteId);

  const record = [checkedData, arrayId, arrayValues, nowDate, noteId];
  const queryString =
    "UPDATE note_table SET note_list=?, note_keys=?, checked_list=?, note_updateDate=? WHERE id=?  ";
  conn.db.query(queryString, record, (err, result) => {
    if (err) throw err;
    else console.log("success");
    getData();
  });
};

const UpdateCheckNoteList = (objectChecked, key) => {
  console.log("from command");
  console.log(objectChecked, key);

  const record = [objectChecked, nowDate, key];
  const queryString =
    "UPDATE note_table SET checked_list=?, note_updateDate=? WHERE id=?  ";
  conn.db.query(queryString, record, (err, result) => {
    if (err) throw err;
    else console.log("success");
    getData();
  });
};

const UpdateNoteList = (checkedData, noteId) => {
  console.log("from command");
  console.log(checkedData, noteId);

  const record = [checkedData, nowDate, noteId];
  const queryString =
    "UPDATE note_table SET note_list=?, note_updateDate=? WHERE id=?  ";
  conn.db.query(queryString, record, (err, result) => {
    if (err) throw err;
    else console.log("success");
    getData();
  });
};

function getData() {
  const queryString = "SELECT * FROM note_table";
  conn.db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed", err);
      return;
    }
    data = JSON.parse(JSON.stringify(rows));
  });
  return data;
}
getData();

/**
 *
 *
 *
 */

const insertIdea = (ideaTitle, req) => {
  const queryString = `INSERT INTO idea_table (idea_title, idea_insertDate, idea_updateDate, userId) VALUES ('${ideaTitle}', '${nowDate}', '${nowDate}',${req.session.auth.userId}) `;
  conn.db.query(queryString, (err, result) => {
    if (err) console.log("Failed", err);
    else console.log("Added Success! ");
    getDataIdea();
  });
};

const UpdateIdeaData = (ideaData, key) => {
  const record = [ideaData, nowDate, key];
  const queryString =
    "UPDATE idea_table SET idea_data=?, idea_updateDate=? WHERE id=?  ";
  conn.db.query(queryString, record, (err, result) => {
    if (err) throw err;
    else console.log("success");
    getDataIdea();
  });
};

const removeIdea = (ideaId) => {
  const queryString = `DELETE FROM idea_table WHERE id = '${ideaId}'`;
  conn.db.query(queryString, (err, result) => {
    if (err) console.log("Failed", err);
    else console.log("Remove Success!");
    getDataIdea();
  });
};

function getDataIdea() {
  const queryString = "SELECT * FROM idea_table";
  conn.db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed", err);
      return;
    }
    dataIdea = JSON.parse(JSON.stringify(rows));
  });
  return dataIdea;
}
getDataIdea();

/**
 *
 *
 * user Commands
 *
 *
 *
 */

const createUser = (username, userPassword) => {
  conn.db.query(
    "INSERT INTO user_table (username, password) VALUES (?, ?)",
    [username, userPassword],
    function (err, result) {
      if (err) console.log("Failed", err);
      else console.log("Added Success! ");
    }
  );
};

function hash(input, salt) {
  const key = crypto.pbkdf2Sync(input, salt, 1000, 30, "sha512");
  return ["pbkdf2", "1000", salt, key.toString("hex")].join("$");
}

const loginUser = (username, userPassword, res, req) => {
  conn.db.query(
    "SELECT * FROM user_table WHERE username = ?",
    [username],
    function (err, result) {
      if (err) console.log("Failed", err);
      else {
        if (result.length === 0) {
          res.sendStatus(403);
          console.log("Username/Password is invalid");
        } else {
          const hashPasswordDB = result[0].password;
          const salt = hashPasswordDB.split("$")[2];
          const hashed = hash(userPassword, salt);

          if (hashed === hashPasswordDB) {
            req.session.auth = { userId: result[0].id };
            res.sendStatus(200);
            console.log("Credentials correct");
          } else {
            res.sendStatus(403);
            console.log("Username/Password is invalid");
          }
        }
      }
    }
  );
};

module.exports = {
  getData: getData,
  insertData: insertData,
  insertNote: insertNote,
  UpdateNote: UpdateNote,
  UpdateCheckNoteList: UpdateCheckNoteList,
  UpdateNoteList: UpdateNoteList,
  removeNote: removeNote,
  getDataIdea: getDataIdea,
  insertIdea: insertIdea,
  UpdateIdeaData: UpdateIdeaData,
  removeIdea: removeIdea,
  createUser: createUser,
  loginUser: loginUser,
};
