const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM donvitinh";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});
router.route("/:ID").get((req, res) => {
    const {ID} = req.params;
    let sql = "SELECT * FROM donvitinh where ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const { name } = req.body;
    let sql = "INSERT INTO `donvitinh`(`name`) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/edit/:ID").post((req, res) => {
    const { ID } = req.params;
    const { name } = req.body;
    let sql = "UPDATE `donvitinh` SET `name`= ? WHERE ID = ?";
    db.query(sql, [name, ID], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/delete/:ID").delete((req, res) => {
    const { ID } = req.params;
    let sql = "DELETE FROM `donvitinh` WHERE ID = ?";
    let sqlFacility =
        "SELECT COUNT(donViTinh) as SL FROM `facility` WHERE donViTinh = ?";
    db.query(sqlFacility, ID, (err, result) => {
        if (result[0].SL > 0) {
            res.send("Error");
        } else {
            db.query(sql, ID, (err, result) => {
                if (err) throw err;
                console.log("deleted");
                res.json(result);
            }
            );
        }
    });
});

module.exports = router;