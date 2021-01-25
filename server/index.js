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

process.env.TZ = "Asia/Ho_Chi_Minh";

// ---------- KHAI BÁO LINK CONNECT  ----------
const db = require("./connection");
const categoriesRouter = require("./route/categories");
const accountRouter = require("./route/account");
const danhMucQuyenRouter = require("./route/danhMucQuyen");
const nhanVienRouter = require("./route/nhanVien");
const facilityRouter = require("./route/facility");
const donViTinhRouter = require("./route/donViTinh");
const donViQuanLyRouter = require("./route/donviQuanLy");
const historyRouter = require("./route/history");
const muonTaiSanRouter = require("./route/muonTaiSan");
const chiTietMuonTaiSanRouter = require("./route/chiTietMuonTaiSan");
// ---------- END ----------

// ---------- KHAI BÁO ROUTER ----------
app.use("/categories", categoriesRouter);
app.use("/account", accountRouter);
app.use("/quyen", danhMucQuyenRouter);
app.use("/nhanvien", nhanVienRouter);
app.use("/facility", facilityRouter);
app.use("/donvitinh", donViTinhRouter);
app.use("/donViQuanLy", donViQuanLyRouter);
app.use("/history", historyRouter);
app.use("/muon-tai-san", muonTaiSanRouter);
app.use("/chi-tiet-muon-tai-san", chiTietMuonTaiSanRouter);
// ---------- END ----------

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
