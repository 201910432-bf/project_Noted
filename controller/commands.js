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

module.exports = {
  getData: getData,
  insertData: insertData,
};
