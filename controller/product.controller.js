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
        try {
            const data = await pool.query("select id, name, price from product");
            const parsedData = JSON.parse(JSON.stringify(data));
            res.json({
                data: parsedData
            });
        } catch (error) {
            console.log("Error in getAll method:", error); // 输出实际的错误信息
            res.json({
                status: "error_getAll",
                error: error.message // 将错误信息添加到响应中
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from product where id = ?", [id])
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