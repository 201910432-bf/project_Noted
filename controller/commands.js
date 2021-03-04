const conn = require("../conn");
var data;

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

const insertNote = (note) => {
  console.log(new Date(nowDate));
  console.log(todayTime);

  const queryString = `INSERT INTO note_table (note_title, note_insertDate, note_updateDate) VALUES ('${note}', '${nowDate}', '${nowDate}') `;
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
    else console.log("Added Success! ");
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

module.exports = {
  getData: getData,
  insertData: insertData,
  insertNote: insertNote,
  UpdateNote: UpdateNote,
  UpdateCheckNoteList: UpdateCheckNoteList,
  UpdateNoteList: UpdateNoteList,
  removeNote: removeNote,
};
