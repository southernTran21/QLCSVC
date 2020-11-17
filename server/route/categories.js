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

module.exports = router;