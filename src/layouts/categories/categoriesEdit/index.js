import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "../../../history";

import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
const { TextArea } = Input;



export default class CategoriesEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
        };
    }

    componentDidMount() {
        const PATH = window.location.search.match(/id=(.*)\b/)[1];
        if (PATH !== "" || PATH != null) {
            axios
                .get("http://localhost:3001/categories/" + PATH)
                .then((response) => {
                    this.setState({
                        name: response.data[0].name,
                        description: response.data[0].description,
                    });
                });
        }
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
        const PATH = window.location.search.match(/id=(.*)\b/)[1];
        const { name, description } = this.state;
        if ((name, description == "")) {
            message.error(
                "Không được để dữ liệu trống. Vui lòng kiểm tra lại!!!!!!!!"
            );
        } else {
            axios
                .post("http://localhost:3001/categories/edit/" + PATH, {
                    name: name,
                    description: description,
                })
                .then((res) => {
                    message.success("Đã Lưu");
                    history.push("/admin/categories");
                    window.location.reload();
                });
        }
    };
    render() {
        const { name, description } =  this.state;
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
                        Sửa Loại Tài Sản
                    </span>
                </div>
                <div className="categories-add__body">
                    <div className="categories-add__input">
                        <span>Tên Loại</span>
                        <Input
                            placeholder="Nhập Tên Loại"
                            onChange={this.onChangeName}
                            value={name}
                        />
                    </div>
                    <div className="categories-add__input">
                        <span>Mô Tả</span>
                        <TextArea
                            rows={4}
                            placeholder="Nhập Mô Tả Loại"
                            onChange={this.onChangeDesc}
                            value={description}
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
