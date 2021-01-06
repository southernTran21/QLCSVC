-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 06, 2021 lúc 07:12 AM
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
(10, 'test1', 'test'),
(12, 'test3', 'ádasdasd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietmuontaisan`
--

CREATE TABLE `chitietmuontaisan` (
  `IDMuon` int(11) NOT NULL,
  `IDTaiSan` int(11) NOT NULL,
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
(1, 'Khoa CNTT', '123456789', 'khoacntthutech@gmail.com');

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
  `ID` bigint(20) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `QRCODE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCat` int(11) DEFAULT NULL,
  `donViTinh` int(50) DEFAULT NULL,
  `ngayMua` date NOT NULL,
  `hanSuDung` int(11) NOT NULL,
  `giaTien` decimal(10,0) NOT NULL,
  `donViQuanLy` int(11) DEFAULT NULL,
  `moTa` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `facility`
--

INSERT INTO `facility` (`ID`, `name`, `QRCODE`, `idCat`, `donViTinh`, `ngayMua`, `hanSuDung`, `giaTien`, `donViQuanLy`, `moTa`) VALUES
(123456, 'TEST', '123456', 10, 1, '2020-11-26', 6, '100000', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(2020121, 'asdx', '2020121', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(202012121, 'asdx', '202012121', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(2020121217, 'asdx', '2020121217', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(2147483647, 'asdx', '202012121724562929', 12, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(20201212172, 'asdx', '20201212172', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(2020121217263, 'asdx', '2020121217263', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(20201212172637, 'asdx', '20201212172637', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(202012121726379, 'asdx', '202012121726379', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(20201212172637983, 'asdx', '20201212172637983', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(202012121726379832, 'asdx', '202012121726379832', 10, 1, '2020-12-02', 6, '12523', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'),
(202012292318562873, 'abcádasd', '202012292318562873', 10, 1, '2015-05-12', 6, '1000000', 1, 'acb abc abc abc acb acb acb');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `muontaisan`
--

CREATE TABLE `muontaisan` (
  `ID` bigint(50) NOT NULL,
  `MaNhanVien` int(11) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `SoDienThoai` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HoTen` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NgayMuon` date NOT NULL,
  `NgayTra` date NOT NULL
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `danhmucquyen`
--
ALTER TABLE `danhmucquyen`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `donviquanly`
--
ALTER TABLE `donviquanly`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `donvitinh`
--
ALTER TABLE `donvitinh`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
