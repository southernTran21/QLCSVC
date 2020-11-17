const { model } = require("mongoose");
const mysql = require("mysql");
require("dotenv").config();

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: process.env.NAME_DATABASE,
});

db.connect((err) => {
    if (!err) console.log("DB connection success");
    else console.log("DB connection failed");
});

module.exports = db;