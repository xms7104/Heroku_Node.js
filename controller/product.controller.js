const pool = require("../database/index")
const productController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from product");
            res.json({
                data: rows
            });
        } catch (error) {
            console.log("Error in getAll method:", error);
            res.json({
                status: "error"
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