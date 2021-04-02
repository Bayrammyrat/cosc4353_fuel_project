const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "userdb",
  password: "password",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
    console.log("Connected");
});

module.exports = mysqlConnection;