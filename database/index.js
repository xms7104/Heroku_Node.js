const mysql = require("mysql");

const db = mysql.createConnection({
    host: "bapp1ylp6e4pepz9rc6u-mysql.services.clever-cloud.com",
    user: "ue7pr1zr4teaxfmh",
    password: "tNslVf39rXYSFwX7EF0u",
    database: "bapp1ylp6e4pepz9rc6u",
  });

  db.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = db.promise()