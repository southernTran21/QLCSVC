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

router.route("/getNewFacility").get((req, res) => {
    let sql =
        "SELECT * FROM `facility` WHERE idCat is null or donViQuanLy is null";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});
router.route("/getFacility/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql = "SELECT * FROM `facility` WHERE ID =?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql =
        "SELECT facility.ID as id, facility.name as name, QRCODE, categories.name as nameCat, donvitinh.name as donViTinh, ngayMua, hanSuDung, giaTien, donviquanly.name as donViQuanLy, moTa, idCat FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) where facility.ID = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");

        res.json(result);
    });
});

router.route("/getFacilityForCategory/:ID").get((req, res) => {
    const { ID } = req.params;
    console.log(ID);
    if (ID != "all") {
        let sql =
            "SELECT facility.ID as id, facility.name as name, QRCODE, categories.name as nameCat, donvitinh.name as donViTinh, ngayMua, hanSuDung, giaTien, donviquanly.name as donViQuanLy, moTa, idCat FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) where idCat = ? ORDER BY id ASC limit 10 OFFSET 0";
        let sqlGetCount =
            "SELECT COUNT(*) as SL FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) where idCat = ? ";
        db.query(sql, ID, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            db.query(sqlGetCount, ID, (err, count) => {
                if (err) throw err;
                console.log(Math.ceil(count[0].SL / 10));
                res.json([result, (sl = Math.ceil(count[0].SL / 10))]);
            });
        });
    } else {
        let sql =
            "SELECT facility.ID as id, facility.name as name, QRCODE, categories.name as nameCat, donvitinh.name as donViTinh, ngayMua, hanSuDung, giaTien, donviquanly.name as donViQuanLy, moTa, idCat FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) ORDER BY id ASC limit 10 OFFSET 0";
        let sqlGetCount =
            "SELECT COUNT(*) as SL FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) ";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            db.query(sqlGetCount, (err, count) => {
                if (err) throw err;
                res.json([result, (sl = Math.ceil(count[0].SL / 10))]);
            });
        });
    }
});

router.route("/getFacilityPagination/:page").get((req, res) => {
    const { page } = req.params;
    const max = page * 10;
    const min = max - 10;
    let sql =
        "SELECT facility.ID as id, facility.name as name, QRCODE, categories.name as nameCat, donvitinh.name as donViTinh, ngayMua, hanSuDung, giaTien, donviquanly.name as donViQuanLy, moTa, idCat FROM (facility INNER JOIN categories on facility.idCat = categories.ID INNER join donViTinh on facility.donViTinh = donViTinh.ID INNER JOIN donViQuanLy on facility.donViQuanLy = donViQuanLy.ID) ORDER BY id ASC limit ? OFFSET ?";
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

    const {
        name,
        idCat,
        donViTinh,
        ngayMua,
        hanSuDung,
        giaTien,
        donViQuanLy,
        moTa,
    } = req.body;
    let sql =
        "INSERT INTO `facility`(`ID`, `name`, `QRCODE`, `idCat`, `donViTinh`, `ngayMua`, `hanSuDung`, `giaTien`, `donViQuanLy`, `moTa`) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
            donViQuanLy,
            moTa,
        ],
        (err, result) => {
            if (err) throw err;
            console.log("added");
            res.json(result);
        }
    );
});

router.route("/edit/:ID").post((req, res) => {
    const { ID } = req.params;

    const {
        name,
        idCat,
        donViTinh,
        ngayMua,
        hanSuDung,
        giaTien,
        donViQuanLy,
        moTa,
    } = req.body;
    console.log(req.body)
    let sql =
        "UPDATE `facility` SET `name`=?,`idCat`=?,`donViTinh`=?,`ngayMua`=?,`hanSuDung`=?,`giaTien`=?,`donViQuanLy`=?,`moTa`=? WHERE ID = ?";
    db.query(
        sql,
        [
            name,
            idCat,
            donViTinh,
            ngayMua,
            hanSuDung,
            giaTien,
            donViQuanLy,
            moTa,
            ID,
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
