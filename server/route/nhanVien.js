const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM nhanvien";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const { tenNV, soDienThoai, diaChi, idAccount } = req.body;
    console.log(soDienThoai)
    let sql =
        "INSERT INTO `nhanvien`(`tenNV`, `soDienThoai`, `diaChi`, `idAccount`) VALUES (?,?,?,?)";
    db.query(sql, [tenNV, soDienThoai, diaChi, idAccount], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

router.route("/delete/:ID").delete((req, res) => {
    const { ID } = req.params;
    let sql = "DELETE FROM `nhanvien` WHERE ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("deleted");
        res.json(result);
    });
});

module.exports = router;
