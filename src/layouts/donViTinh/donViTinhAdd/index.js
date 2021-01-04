import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
const { TextArea } = Input;

export default class DonViTinhAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onSubmit = (e) => {
        const { name } = this.state;
        if (name == "") {
            message.error(
                "Không được để dữ liệu trống. Vui lòng kiểm tra lại!!!!!!!!"
            );
        } else {
            axios
                .post("http://localhost:3001/donvitinh/add", {
                    name: name,
                })
                .then((res) => {
                    message.success("Đã Lưu");
                    this.setState({
                        name: "",
                    });
                });
            message.success("Đã Lưu");
        }
    };

    render() {
        return (
            <div className="categories-add">
                <div className="categories-add__top">
                    <Link
                        to="/admin/don-vi-tinh"
                        className="categories-add__icon"
                    >
                        <LeftCircleOutlined />
                    </Link>
                    <span className="categories-add__title">
                        Thêm Đơn Vị Tính
                    </span>
                </div>
                <div className="categories-add__body">
                    <div className="categories-add__input">
                        <span>Tên Đơn Vị Tính</span>
                        <Input
                            placeholder="Nhập Tên Đơn Vị Tính"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div
                        className="categories-add__button-submit"
                        onClick={this.onSubmit}
                    >
                        Xác Nhận
                    </div>
                </div>
            </div>
        );
    }
}
