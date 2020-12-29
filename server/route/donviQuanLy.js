const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM donviquanly";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});
router.route("/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql = "SELECT * FROM donviquanly where ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const { name, soDienThoai, email } = req.body;
    let sql = "INSERT INTO `donviquanly`(`name`) VALUES (?)";
    db.query(sql, [name, soDienThoai, email], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/edit/:ID").post((req, res) => {
    const { ID } = req.params;
    const { name, soDienThoai, email } = req.body;
    let sql = "UPDATE `donviquanly` SET `name`= ? WHERE ID = ?";
    db.query(sql, [name, soDienThoai, email, ID], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/delete/:ID").delete((req, res) => {
    const { ID } = req.params;
    let sql = "DELETE FROM `donviquanly` WHERE ID = ?";
    let sqlFacility =
        "SELECT COUNT(donViQuanLy) as SL FROM `facility` WHERE donViQuanLy = ?";
    db.query(sqlFacility, ID, (err, result) => {
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
