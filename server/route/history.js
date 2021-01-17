const router = require("express").Router();
const db = require("../connection");

router.route("/").get((req, res) => {
    let sql = "SELECT * FROM `history`";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    console.log(req.body);
    const { Name, QRCODE } = req.body;

    let date_ob = new Date();

    // current date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    const abc = date + "-" + month + "-" + year;

    let sql = "INSERT INTO `history` (`Name`, `Date`,`QRCODE`) VALUES (?, ?, ?)";
    db.query(sql, [QRCODE,abc, req.body.Date], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

module.exports = router;
