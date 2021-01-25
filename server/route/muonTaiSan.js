const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM `muontaisan`";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});
router.route("/phone/:phone").get((req, res) => {
    const { phone } = req.params;
    console.log(phone);
    let sql = "SELECT * FROM `muontaisan` WHERE SoDienThoai = ?";
    db.query(sql, phone, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});
router.route("/cmnd/:cmnd").get((req, res) => {
    const { cmnd } = req.params;
    let sql = "SELECT * FROM `muontaisan` WHERE CMND = ?";
    db.query(sql, cmnd, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const {
        ID,
        MaNhanVien,
        SoLuong,
        SoDienThoai,
        CMND,
        HoTen,
        NgayMuon,
        NgayTra,
    } = req.body;
    console.log(req.body);
    let sql =
        "INSERT INTO `muontaisan`(`ID`, `MaNhanVien`, `SoLuong`, `SoDienThoai`, `CMND`, `HoTen`, `NgayMuon`, `NgayTra`, `tinhTrang`) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(
        sql,
        [
            ID,
            MaNhanVien,
            SoLuong,
            SoDienThoai,
            CMND,
            HoTen,
            NgayMuon,
            NgayTra,
            0,
        ],
        (err, result) => {
            if (err) throw err;
            console.log("added");
            res.json(result);
        }
    );
});

module.exports = router;
