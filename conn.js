// const mysql = require("mysql");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  else console.log("Mysql Connected...");
});

module.exports = {
  db: db,
};
