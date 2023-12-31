const mysql = require("mysql");

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
});

pool.getConnection((err, conn) => {
    if (err) {
        console.log("Error connecting to the database:", err);
    } else {
        console.log("Connected successfully");
    }
});

const productController = {
    getAll: async (req, res) => { 
        await pool.query( "SELECT * FROM product",
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
        }
        );
    },
    getById: async (req, res) => {
        const { id } = req.params
        await pool.query( "SELECT * FROM product WHERE id = ?", [id],
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
        }
        )
    },
    create: async (req, res) => {
        const { title, price } = req.body
        await pool.query( "INSERT INTO product (title, price) values (?, ?)", [title, price],
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
        }
        )
    },
    update: async (req, res) => {
        const { title, price } = req.body
        const { id } = req.params
        await pool.query( "UPDATE product SET title = ?, price = ? where id = ?", [title, price, id],
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
        }
        )
    }, 
    delete: async (req, res) => {
        const { id } = req.params
        await pool.query( "DELETE from product where id = ?", [id],
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
        }
        )
    }

}

module.exports = productController