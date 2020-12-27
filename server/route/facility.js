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
    console.log(ID)
    if (ID != "all") {
        let sql =
            "SELECT * FROM facility where idCat = ? ORDER BY id DESC limit 10 OFFSET 0";
        let sqlGetCount =
            "SELECT COUNT(*) as SL FROM `facility` where idCat = ? ";
        db.query(sql, ID, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            db.query(sqlGetCount, ID, (err, count) => {
                if (err) throw err;
                res.json([
                    result,
                    count[0].SL - 1 < 10
                        ? (sl = 1)
                        : (sl = Math.floor((count[0].SL - 1) / 10) + 1),
                ]);
            });
        });
    } else {
        let sql =
            "SELECT * FROM facility ORDER BY id DESC limit 10 OFFSET 0";
        let sqlGetCount =
            "SELECT COUNT(*) as SL FROM `facility` ";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            db.query(sqlGetCount, (err, count) => {
                if (err) throw err;
                res.json([
                    result,
                    count[0].SL - 1 < 10
                        ? (sl = 1)
                        : (sl = Math.floor((count[0].SL - 1) / 10) + 1),
                ]);
            });
        });
    }
});

router.route("/getCountPagination").get((req, res) => {
    let sql = "SELECT COUNT(*) as SL FROM `facility`";
    let sl = 0;
    db.query(sql, (err, result) => {
        result[0].SL - 1 < 10
            ? (sl = 1)
            : (sl = Math.floor((result[0].SL - 1) / 10) + 1);
        console.log(result);
        console.log(sl);
    });
});

router.route("/getFacilityPagination/:page").get((req, res) => {
    const { page } = req.params;
    const max = page * 10;
    const min = max - 10;
    let sql = "Select * from facility ORDER BY id DESC limit ? OFFSET ?";
    db.query(sql, [max, min], (err, result) => {
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
    let random = Math.floor(Math.random() * Math.floor(9999));

    const ID = year + month + date + hours + minutes + seconds + random;
    const QRCODE = year + month + date + hours + minutes + seconds + random;
    const tinhTrang = 1;
    const nguoiSuDung = null;

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
