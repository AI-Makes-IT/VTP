// Set up Node.js and Express:
// Create a new Node.js project by running: npm init in the terminal.
// Install Express by running: npm install express.

// Set up MySQL:
// Install the mysql2 library by running: npm install mysql2.
// Connect to the MySQL database in the app.js file:

const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Create the database
connection.query("CREATE DATABASE testdb", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

// Connect to the newly created database
connection.query("USE testdb", function (err, result) {
  if (err) throw err;
  console.log("Using testdb");
});

// Create the table
connection.query("CREATE TABLE testtable (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age INT)", function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM testtable", (error, results, fields) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
