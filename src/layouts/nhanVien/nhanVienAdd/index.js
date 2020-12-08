import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
const { Option } = Select;

export default class NhanVienAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenNV: "",
            soDienThoai: "",
            diaChi: "",
            account: [],
            idAccount: "",
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:3001/account/getNameAccount")
            .then((response) => {
                this.setState({ account: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeName = (e) => {
        this.setState({
            tenNV: e.target.value,
        });
    };

    onChangeSoDienThoai = (e) => {
        console.log(e.target.value)
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
        const { tenNV, soDienThoai, diaChi, idAccount } = this.state;
        console.log(soDienThoai)
        axios.post("http://localhost:3001/nhanvien/add", {
            tenNV: tenNV,
            soDienThoai: soDienThoai,
            diaChi: diaChi,
            idAccount: idAccount,
        });
    };

    handleChangeAccount = (value) => {
        this.setState({
            idAccount: value,
        });
    };

    render() {
        const { account } = this.state;
        console.log(account);
        return (
            <div className="nhanvien-add">
                <div className="nhanvien-add__top">
                    <Link to="/admin/nhanvien" className="nhanvien-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="nhanvien-add__title">Thêm Nhân Viên</span>
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
                    <div className="nhanvien-add__input">
                        <span>Quyền</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={this.handleChangeAccount}
                            placeholder="Chọn Tài Khoản"
                        >
                            {account.map((result, index) => {
                                return (
                                    <Option value={result.ID} key={index}>
                                        {result.username} - {result.tenQuyen}
                                    </Option>
                                );
                            })}
                        </Select>
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
