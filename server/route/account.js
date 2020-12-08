const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM account";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/getNameAccount").get((req, res) => {
    let sql = "SELECT account.ID, username, tenQuyen FROM (`account` INNER JOIN `danhmucquyen` on account.idQuyen = danhmucquyen.ID)";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const {username, password,idQuyen} = req.body;
    let sql = "INSERT INTO `account`(`username`, `password`, `idQuyen`) VALUES (?,?,?)";
    db.query(sql, [username, password,idQuyen], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    }
    );
});

router.route("/delete/:ID").delete((req, res) => {
    const {ID} = req.params;
    let sql = "DELETE FROM `account` WHERE ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("deleted");
        res.json(result);
    }
    );
});

module.exports = router;