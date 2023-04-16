const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 7000,
  user: "root",
  password: "",
  database: "signup",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("ERROR");
    } else if (data.length > 0) {
      return res.json("SUCCESS");
    }
    return res.json("FAILED");
  });
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("ERROR");
    }
    return res.json(data);
  });
});

app.listen(8081, () => {});
