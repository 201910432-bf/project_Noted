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

const insertData = (checkedData, arrayId, arrayValues, title, key) => {
  console.log(checkedData, arrayId, arrayValues, "throw from commands");

  const record = [title, arrayValues, arrayId, checkedData, nowDate, key];

  const queryString =
    "UPDATE note_table SET note_title=?, note_list=?, note_keys=?, checked_list=?, note_updateDate=? WHERE id=?  ";
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

module.exports = {
  getData: getData,
  insertData: insertData,
  insertNote: insertNote,
};
