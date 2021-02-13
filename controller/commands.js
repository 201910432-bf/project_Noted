const conn = require("../conn");
var data;

function getData() {
  const queryString = "SELECT * FROM dummy_table";
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
};
