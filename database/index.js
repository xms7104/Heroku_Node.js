// const mysql = require("mysql");

// const pool = mysql.createPool({
//     host: process.env.DB_HOST, 
//     user: process.env.DB_USERNAME, 
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// pool.getConnection((err, conn) => {
//     if (err) {
//         console.log("Error connecting to the database:", err);
//     } else {
//         console.log("Connected successfully");
//     }
// });

// module.exports = pool;
