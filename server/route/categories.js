const router = require("express").Router();
const db = require("../connection");


router.route("/").get((req, res) => {
    let sql = "SELECT * FROM categories";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const {name, description} = req.body;
    let sql = "INSERT INTO `categories`(`name`, `description`) VALUES (?,?)";
    db.query(sql, [name, description], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    }
    );
});

router.route("/delete/:ID").delete((req, res) => {
    const {ID} = req.params;
    let sql = "DELETE FROM `categories` WHERE ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("deleted");
        res.json(result);
    }
    );
});

module.exports = router;