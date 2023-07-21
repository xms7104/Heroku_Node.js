const mysql = require("mysql");

const pool = mysql.createPool({
    host: 'bapp1ylp6e4pepz9rc6u-mysql.services.clever-cloud.com', 
    user: 'ue7pr1zr4teaxfmh', 
    password: 'tNslVf39rXYSFwX7EF0u',
    database: 'bapp1ylp6e4pepz9rc6u',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
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
        try {
            const { title, price } = req.body
            const sql = "insert into product (title, price) values (?, ?)"
            const [rows, fields] = await pool.query(sql, [title, price])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { title, price } = req.body
            const { id } = req.params
            const sql = "update product set title = ?, price = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [title, price, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from product where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = productController