import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default class NhanVienAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenNV: "",
            soDienThoai: "",
            diaChi: "",
        };
    }

    onChangeName = (e) => {
        this.setState({
            tenNV: e.target.value,
        });
    };

    onChangeSoDienThoai = (e) => {
        this.setState({
            soDienThoai: e.target.value,
        });
    };

    onChangeDiaChi = (e) => {
        this.setState({
            diaChi: e.target.value,
        });
    };

    onSubmit = (e) => {
        const { tenNV, soDienThoai, diaChi } = this.state;
        axios.post("http://localhost:3001/nhanvien/add", {
            tenNV: tenNV,
            soDienThoai: soDienThoai,
            diaChi: diaChi,
        });
    };

    render() {
        return (
            <div className="nhanvien-add">
                <div className="nhanvien-add__top">
                    <Link to="/admin/nhanvien" className="nhanvien-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="nhanvien-add__title">
                        Thêm Nhân Viên
                    </span>
                </div>
                <div className="nhanvien-add__body">
                    <div className="nhanvien-add__input">
                        <span>Tên Nhân Viên</span>
                        <Input
                            placeholder="Nhập Tên Nhân Viên"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="nhanvien-add__input">
                        <span>Số Điện Thoại</span>
                        <Input
                            placeholder="Nhập Số Điện Thoại"
                            onChange={this.onChangeSoDienThoai}
                        />
                    </div>
                    <div className="nhanvien-add__input">
                        <span>Địa Chỉ</span>
                        <Input
                            placeholder="Nhập Địa Chỉ"
                            onChange={this.onChangeDiaChi}
                        />
                    </div>
                    <div
                        className="nhanvien-add__button-submit"
                        onClick={this.onSubmit}
                    >
                        Xác Nhận
                    </div>
                </div>
            </div>
        );
    }
}
