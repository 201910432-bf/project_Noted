const conn = require("../conn");
var data;

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

const insertData = (data) => {
  console.log(data, "throw from commands");
};

const insertNote = (note) => {
  // const queryString = `INSERT INTO note_table (note_title, note_insertDate, note_updateDate) VALUES ('${note}', '${mySQLDateString}', '${mySQLDateString}') `;
  // conn.db.query(queryString, (err, result) => {
  //   if (err) {
  //     console.log("Failed", err);
  //     return;
  //   } else {
  //     console.log(note, "Added Success! ", date);
  //     getData();
  //   }
  // });
};

module.exports = {
  getData: getData,
  insertData: insertData,
  insertNote: insertNote,
};
