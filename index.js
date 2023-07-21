const express = require('express');
const app = express();

const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: "bapp1ylp6e4pepz9rc6u-mysql.services.clever-cloud.com",
  user: "ue7pr1zr4teaxfmh",
  password: "tNslVf39rXYSFwX7EF0u",
  database: "bapp1ylp6e4pepz9rc6u",
});

// Getting Request
app.get("/", (req, res, next) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.error("錯誤發生：", err);
      return next(err); // 將錯誤交給下一個中介軟體處理
    } else {
      res.send(result);
    }
  });
});


// Establishing the port
const PORT = process.env.PORT ||5000;

// Executing the server on given port number
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));