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
router.route("/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql = "SELECT * FROM account where ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/getNameAccount").get((req, res) => {
    let sql =
        "SELECT account.ID, username, tenQuyen FROM (`account` INNER JOIN `danhmucquyen` on account.idQuyen = danhmucquyen.ID)";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const { username, password, idQuyen, displayName } = req.body;
    let sql =
        "INSERT INTO `account`(`username`, `password`, `idQuyen`, `displayName`) VALUES (?,?,?,?)";
    db.query(sql, [username, password, idQuyen, displayName], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/edit/:ID").post((req, res) => {
    const { ID } = req.params;
    const { username, password, idQuyen, displayName } = req.body;
    let sql =
        "UPDATE `account` SET `username`= ?,`password`= ? ,`idQuyen`= ? ,`displayName`= ? WHERE ID = ?";
    db.query(
        sql,
        [username, password, idQuyen, displayName, ID],
        (err, result) => {
            if (err) throw err;
            console.log("added");
            res.json(result);
        }
    );
});

router.route("/delete/:ID").delete((req, res) => {
    const { ID } = req.params;
    let sql = "DELETE FROM `account` WHERE ID = ?";
    const sqlNhanVien =
        "select count(idAccount) as SL from nhanvien where idAccount = ? ";
    db.query(sqlNhanVien, ID, (err, result) => {
        if (result[0].SL > 0) {
            res.send("Error");
        } else {
            db.query(sql, ID, (err, result) => {
                if (err) throw err;
                console.log("deleted");
                res.json(result);
            });
        }
    });
});

module.exports = router;
