-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 25, 2021 lúc 01:10 AM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `facility_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idQuyen` int(11) NOT NULL,
  `displayName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`ID`, `username`, `password`, `idQuyen`, `displayName`) VALUES
(8, 'southern', '123456', 3, 'SOUTHERN'),
(10, 'southern1', '123456789', 4, 'SOUTHERN');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`ID`, `name`, `description`) VALUES
(13, 'Máy Chiếu', 'Máy Chiếu'),
(14, 'Cáp', 'Các Loại Cáp'),
(15, 'Chuột', 'Các Loại Chuột'),
(16, 'Ổ Cắm', 'Các Loại Ổ Cắm');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietmuontaisan`
--

CREATE TABLE `chitietmuontaisan` (
  `IDMuon` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IDTaiSan` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SoLuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmucquyen`
--

CREATE TABLE `danhmucquyen` (
  `ID` int(11) NOT NULL,
  `tenQuyen` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moTa` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `danhmucquyen`
--

INSERT INTO `danhmucquyen` (`ID`, `tenQuyen`, `moTa`) VALUES
(3, 'quản trị', 'Có toàn quyền trong hệ thống'),
(4, 'nhân Viên', 'có quyền trong các page của nhân viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donviquanly`
--

CREATE TABLE `donviquanly` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `soDienThoai` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donviquanly`
--

INSERT INTO `donviquanly` (`ID`, `name`, `soDienThoai`, `email`) VALUES
(1, 'Khoa CNTT', '123456789', 'khoacntt@gmail.com'),
(2, 'Khoa Quản Trị Kinh Doanh', '456789', 'khoaqtkq@gmail.com'),
(3, 'Khoa Du Lịch', '456789', 'khoadlq@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donvitinh`
--

CREATE TABLE `donvitinh` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donvitinh`
--

INSERT INTO `donvitinh` (`ID`, `name`) VALUES
(1, 'Cây'),
(2, 'Cái'),
(3, 'Thùng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `facility`
--

CREATE TABLE `facility` (
  `ID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `QRCODE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCat` int(11) DEFAULT NULL,
  `donViTinh` int(50) DEFAULT NULL,
  `ngayMua` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hanSuDung` int(11) NOT NULL,
  `giaTien` decimal(10,0) NOT NULL,
  `donViQuanLy` int(11) DEFAULT NULL,
  `moTa` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `facility`
--

INSERT INTO `facility` (`ID`, `name`, `QRCODE`, `idCat`, `donViTinh`, `ngayMua`, `hanSuDung`, `giaTien`, `donViQuanLy`, `moTa`) VALUES
('2021012577109322', 'Ổ Cắm 500W', '2021012577109322', 16, 2, '2020-12-30', 6, '100000', 1, 'Ổ cắm loại 500W'),
('2021012579591945', 'Máy Chiếu Panasonic', '2021012579591945', 13, 2, '2021-01-08', 12, '3000000', 2, 'Máy Chiếu Hiệu Panasonic');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
--

CREATE TABLE `history` (
  `ID` int(11) NOT NULL,
  `QRCODE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `muontaisan`
--

CREATE TABLE `muontaisan` (
  `ID` bigint(50) NOT NULL,
  `MaNhanVien` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `SoDienThoai` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CMND` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HoTen` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NgayMuon` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NgayTra` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tinhTrang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `ID` int(11) NOT NULL,
  `tenNV` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `soDienThoai` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `diaChi` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idAccount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`ID`, `tenNV`, `soDienThoai`, `diaChi`, `idAccount`) VALUES
(10, 'a', '123456', '23123423', 8);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `khoaNgoaiQuyen` (`idQuyen`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `chitietmuontaisan`
--
ALTER TABLE `chitietmuontaisan`
  ADD PRIMARY KEY (`IDMuon`,`IDTaiSan`);

--
-- Chỉ mục cho bảng `danhmucquyen`
--
ALTER TABLE `danhmucquyen`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `donviquanly`
--
ALTER TABLE `donviquanly`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `donvitinh`
--
ALTER TABLE `donvitinh`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `KhoaNgoaiCAT` (`idCat`);

--
-- Chỉ mục cho bảng `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `muontaisan`
--
ALTER TABLE `muontaisan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `khoaNgoaiTaiKhoan` (`idAccount`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `danhmucquyen`
--
ALTER TABLE `danhmucquyen`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `donviquanly`
--
ALTER TABLE `donviquanly`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `donvitinh`
--
ALTER TABLE `donvitinh`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `history`
--
ALTER TABLE `history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `khoaNgoaiQuyen` FOREIGN KEY (`idQuyen`) REFERENCES `danhmucquyen` (`ID`);

--
-- Các ràng buộc cho bảng `facility`
--
ALTER TABLE `facility`
  ADD CONSTRAINT `KhoaNgoaiCAT` FOREIGN KEY (`idCat`) REFERENCES `categories` (`ID`);

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `khoaNgoaiTaiKhoan` FOREIGN KEY (`idAccount`) REFERENCES `account` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
