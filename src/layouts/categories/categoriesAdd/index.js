import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { TextArea } = Input;

export default class CategoriesAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
        };
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onChangeDesc = (e) => {
        this.setState({
            description: e.target.value,
        });
    };

    onSubmit = (e) => {
        const { name, description } = this.state;
        axios.post("http://localhost:3001/categories/add", {
            name: name,
            description: description,
        });
    };

    render() {
        return (
            <div className="categories-add">
                <div className="categories-add__top">
                    <Link
                        to="/admin/categories"
                        className="categories-add__icon"
                    >
                        <LeftCircleOutlined />
                    </Link>
                    <span className="categories-add__title">
                        Thêm Loại Tài Sản
                    </span>
                </div>
                <div className="categories-add__body">
                    <div className="categories-add__input">
                        <span>Tên Loại</span>
                        <Input
                            placeholder="Nhập Tên Loại"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="categories-add__input">
                        <span>Mô Tả</span>
                        <TextArea
                            rows={4}
                            placeholder="Nhập Mô Tả Loại"
                            onChange={this.onChangeDesc}
                        />
                    </div>
                    <div className="categories-add__button-submit" onClick={this.onSubmit}>
                        Xác Nhận
                    </div>
                </div>
            </div>
        );
    }
}
