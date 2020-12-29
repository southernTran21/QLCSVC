import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, Select, DatePicker, message } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default class FacilityAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            idCat: "",
            donViTinh: "",
            ngayMua: "",
            hanSuDung: "",
            giaTien: "",
            donViQuanLy: "",
            moTa: "",
            categories: [],
            donViQuanLy: [],
            dataDonViTinh: [],
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:3001/categories")
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:3001/donViQuanLy")
            .then((response) => {
                this.setState({ donViQuanLy: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:3001/donvitinh")
            .then((response) => {
                this.setState({ dataDonViTinh: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onChangeCategory = (value) => {
        this.setState({
            idCat: value,
        });
    };

    onChangeDVT = (value) => {
        this.setState({
            donViTinh: value,
        });
    };

    onChangeDate = (date, dateString) => {
        this.setState({
            ngayMua: dateString,
        });
    };

    onChangeDonViQuanLy = (value) => {
        this.setState({
            donViQuanLy: value,
        });
    };

    onChangeHanSuDung = (e) => {
        this.setState({
            hanSuDung: e.target.value,
        });
    };

    onChangeGiaTien = (e) => {
        this.setState({
            giaTien: e.target.value,
        });
    };

    onChangeMoTa = (e) => {
        this.setState({
            moTa: e.target.value,
        });
    };

    onSubmit = () => {
        const {
            name,
            idCat,
            donViTinh,
            ngayMua,
            hanSuDung,
            giaTien,
            donViQuanLy,
            moTa,
        } = this.state;
        if (
            (name,
            idCat,
            donViTinh,
            ngayMua,
            hanSuDung,
            giaTien,
            donViQuanLy,
            moTa == "")
        ) {
            message.error(
                "Không được để dữ liệu trống. Vui lòng kiểm tra lại!!!!!!!!"
            );
        } else {
            axios
                .post("http://localhost:3001/facility/add", {
                    name: name,
                    idCat: idCat,
                    donViTinh: donViTinh,
                    ngayMua: ngayMua,
                    hanSuDung: hanSuDung,
                    giaTien: giaTien,
                    donViQuanLy: donViQuanLy,
                    moTa: moTa,
                })
                .then((res) => {
                    message.success("Đã Lưu");
                    this.setState({
                        name: "",
                        idCat: "",
                        donViTinh: "",
                        ngayMua: "",
                        hanSuDung: "",
                        giaTien: "",
                        donViQuanLy: "",
                        moTa: "",
                    });
                });
        }
    };

    render() {
        const { categories, donViQuanLy, dataDonViTinh } = this.state;
        return (
            <div className="facility-add">
                <div className="categories-add__top">
                    <Link to="/admin/taisan" className="categories-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="categories-add__title">Thêm Tài Sản</span>
                </div>
                <div className="facility-add__body">
                    <div className="facility-add__left">
                        <div className="categories-add__input">
                            <span>Tên Tài Sản</span>
                            <Input
                                placeholder="Nhập Tên Loại"
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Loại Tài Sản</span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.onChangeCategory}
                                placeholder="Chọn Loại Tài Sản"
                            >
                                {categories.map((result, index) => {
                                    return (
                                        <Option value={result.ID} key={index}>
                                            {result.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Đơn Vị Tính</span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.onChangeDVT}
                                placeholder="Chọn Đơn Vị Tính"
                            >
                                {dataDonViTinh.map((result, index) => {
                                    return (
                                        <Option value={result.ID} key={index}>
                                            {result.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Ngày Mua</span>
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn Ngày Mua"
                                onChange={this.onChangeDate}
                            />
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Đơn Vị Quản Lý</span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.onChangeDonViQuanLy}
                                placeholder="Chọn Đơn Vị Quản Lý"
                            >
                                {donViQuanLy.map((result, index) => {
                                    return (
                                        <Option value={result.ID} key={index}>
                                            {result.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className="facility-add__right">
                        <div className="categories-add__input">
                            <span>Hạn Sử Dụng</span>
                            <Input
                                placeholder="Nhập Hạn Sử Dụng"
                                onChange={this.onChangeHanSuDung}
                            />
                        </div>
                        <div className="categories-add__input">
                            <span>Giá Tiền</span>
                            <Input
                                placeholder="Nhập Giá Tiền"
                                onChange={this.onChangeGiaTien}
                            />
                        </div>
                        <div className="categories-add__input">
                            <span>Mô Tả</span>
                            <TextArea
                                rows={4}
                                placeholder="Nhập Mô Tả "
                                onChange={this.onChangeMoTa}
                            />
                        </div>
                    </div>
                </div>
                <div className="facility-add__button-submit">
                    <span onClick={this.onSubmit}>Xác Nhận</span>
                </div>
            </div>
        );
    }
}
