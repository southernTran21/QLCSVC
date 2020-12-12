const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM facility";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/getFacilityForCategory/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql = "SELECT * FROM facility where idCat = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    let date_ob = new Date();

    // current date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // current random
    let random = Math.floor(Math.random() * Math.floor(9999))

    const ID = year+month+date+hours+minutes+seconds+random;
    const QRCODE = year+month+date+hours+minutes+seconds+random;
    const tinhTrang = 1
    const nguoiSuDung = null

    const {
        name,
        idCat,
        donViTinh,
        ngayMua,
        hanSuDung,
        giaTien,
        nguoiQuanLy,
        moTa,
    } = req.body;
    let sql =
        "INSERT INTO `facility`(`ID`, `name`, `QRCODE`, `idCat`, `donViTinh`, `ngayMua`, `hanSuDung`, `giaTien`, `nguoiSuDung`, `nguoiQuanLy`, `tinhTrang`, `moTa`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        sql,
        [
            ID,
            name,
            QRCODE,
            idCat,
            donViTinh,
            ngayMua,
            hanSuDung,
            giaTien,
            nguoiSuDung,
            nguoiQuanLy,
            tinhTrang,
            moTa,
        ],
        (err, result) => {
            if (err) throw err;
            console.log("added");
            res.json(result);
        }
    );
});

router.route("/delete/:ID").delete((req, res) => {
    const { ID } = req.params;
    let sql = "DELETE FROM `facility` WHERE ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("deleted");
        res.json(result);
    });
});

module.exports = router;
