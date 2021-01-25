const router = require("express").Router();
const db = require("../connection");

router.route("/:ID").get((req, res) => {
    const { ID } = req.params;
    let sql = "SELECT * FROM (chitietmuontaisan INNER JOIN facility on IDTaiSan = facility.ID) where IDMuon = ?";
    db.query(sql, ID, (err, result) => {
        if (err) throw err;
        console.log("fetched");
        res.json(result);
    });
});

router.route("/add").post((req, res) => {
    const { ID, IDFacility, quantity } = req.body;
    console.log(req.body);
    let sql =
        "INSERT INTO `chitietmuontaisan`(`IDMuon`, `IDTaiSan`, `SoLuong`) VALUES (?,?,?)";
    db.query(sql, [ID, IDFacility, quantity], (err, result) => {
        if (err) throw err;
        console.log("added");
        res.json(result);
    });
});

module.exports = router;
