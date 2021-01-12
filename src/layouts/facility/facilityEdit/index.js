import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "../../../history";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, Select, DatePicker, message } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default class FacilityEdit extends Component {
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
            dataDonViQuanLy: [],
            dataDonViTinh: [],
        };
    }
    componentDidMount() {
        const PATH = window.location.search.match(/id=(.*)\b/)[1];
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
                this.setState({ dataDonViQuanLy: response.data });
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
        axios
            .get("http://localhost:3001/facility/getFacility/" + PATH)
            .then((response) => {
                console.log(response);
                this.setState({
                    name: response.data[0].name,
                    idCat: response.data[0].idCat,
                    donViTinh: response.data[0].donViTinh,
                    ngayMua: response.data[0].ngayMua,
                    hanSuDung: response.data[0].hanSuDung,
                    giaTien: response.data[0].giaTien,
                    donViQuanLy: response.data[0].donViQuanLy,
                    moTa: response.data[0].moTa,
                });
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

    onChangeDate = (value) => {
        this.setState({
            ngayMua: value,
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
        const PATH = window.location.search.match(/id=(.*)\b/)[1];
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
                .post("http://localhost:3001/facility/edit/" + PATH, {
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
                    history.push("/admin/taisan");
                    window.location.reload();
                });
        }
    };
    render() {
        const {
            categories,
            dataDonViQuanLy,
            dataDonViTinh,
            name,
            idCat,
            donViTinh,
            ngayMua,
            moTa,
            giaTien,
            hanSuDung,
            donViQuanLy,
        } = this.state;
        return (
            <div className="facility-edit">
                <div className="categories-add__top">
                    <Link to="/admin/taisan" className="categories-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="categories-add__title">
                        Sửa Thông Tin Tài Sản
                    </span>
                </div>
                <div className="facility-add__body">
                    <div className="facility-add__left">
                        <div className="categories-add__input">
                            <span>Tên Tài Sản</span>
                            <Input
                                placeholder="Nhập Tên Loại"
                                onChange={this.onChangeName}
                                value={name}
                            />
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Loại Tài Sản</span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.onChangeCategory}
                                placeholder="Chọn Loại Tài Sản"
                                value={idCat}
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
                                value={donViTinh}
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
                            <Input
                                onChange={this.onChangeDate}
                                value={ngayMua}
                            />
                        </div>
                        <div className="nhanvien-add__input">
                            <span>Đơn Vị Quản Lý</span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.onChangeDonViQuanLy}
                                placeholder="Chọn Đơn Vị Quản Lý"
                                value={donViQuanLy}
                            >
                                {dataDonViQuanLy.map((result, index) => {
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
                                value={hanSuDung}
                            />
                        </div>
                        <div className="categories-add__input">
                            <span>Giá Tiền</span>
                            <Input
                                placeholder="Nhập Giá Tiền"
                                onChange={this.onChangeGiaTien}
                                value={giaTien}
                            />
                        </div>
                        <div className="categories-add__input">
                            <span>Mô Tả</span>
                            <TextArea
                                rows={4}
                                placeholder="Nhập Mô Tả "
                                onChange={this.onChangeMoTa}
                                value={moTa}
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
