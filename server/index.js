const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());
app.use(express.json());

// ---------- KHAI BÁO LINK CONNECT  ----------
const db = require("./connection");
const categoriesRouter = require("./route/categories");
const accountRouter = require("./route/account");
const danhMucQuyenRouter = require("./route/danhMucQuyen");
const nhanVienRouter = require("./route/nhanVien");
const facilityRouter = require("./route/facility");
// ---------- END ----------

// ---------- KHAI BÁO ROUTER ----------
app.use("/categories", categoriesRouter);
app.use("/account", accountRouter);
app.use("/quyen", danhMucQuyenRouter);
app.use("/nhanvien", nhanVienRouter);
app.use("/facility", facilityRouter);
// ---------- END ----------

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
