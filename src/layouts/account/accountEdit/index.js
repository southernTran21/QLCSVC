import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, Select, message } from "antd";
import history from "../../../history";
const { Option } = Select;

export default class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            idQuyen: "",
            displayName: "",
            danhMucQuyen: [],
        };
    }

    componentDidMount() {
        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .get(
                    "http://localhost:3001/account/" +
                        window.location.search.match(/id=(.*)\b/)[1]
                )
                .then((response) => {
                    this.setState({
                        username: response.data[0].username,
                        password: response.data[0].password,
                        idQuyen: response.data[0].idQuyen,
                        displayName: response.data[0].displayName,
                    });
                });
        }
        axios
            .get("http://localhost:3001/quyen")
            .then((response) => {
                this.setState({ danhMucQuyen: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    onChangeDisplayName = (e) => {
        this.setState({
            displayName: e.target.value,
        });
    };
    handleChangeQuyen = (value) => {
        this.setState({
            idQuyen: value,
        });
    };

    onSubmit = (e) => {
        const { username, password, idQuyen, displayName } = this.state;
        if ((username, password, idQuyen, displayName == "")) {
            message.error(
                "Không được để dữ liệu trống. Vui lòng kiểm tra lại!!!!!!!!"
            );
        } else {
            axios
                .post(
                    "http://localhost:3001/account/edit/" +
                        window.location.search.match(/id=(.*)\b/)[1],
                    {
                        username: username,
                        password: password,
                        idQuyen: idQuyen,
                        displayName: displayName,
                    }
                )
                .then((res) => {
                    message.success("Đã Lưu");
                    history.push("/admin/account");
                    window.location.reload();
                });
        }
    };

    render() {
        const { danhMucQuyen, username, password, idQuyen, displayName } = this.state;
        return (
            <div className="account-add">
                <div className="account-add__top">
                    <Link to="/admin/account" className="account-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="account-add__title">Thêm Tài Khoản</span>
                </div>
                <div className="account-add__body">
                    <div className="account-add__input">
                        <span>Tên Đăng Nhập</span>
                        <Input
                            placeholder="Nhập Tên Đăng Nhập"
                            value={username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="account-add__input">
                        <span>Mật Khẩu</span>
                        <Input
                            placeholder="Nhập Tên Đăng Nhập"
                            value={password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="account-add__input">
                        <span>Tên Hiển Thị</span>
                        <Input
                            placeholder="Nhập Tên Hiển Thị"
                            value={displayName}
                            onChange={this.onChangeDisplayName}
                        />
                    </div>
                    <div className="account-add__input">
                        <span>Quyền</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={this.handleChangeQuyen}
                            value={idQuyen}
                            placeholder="Chọn Quyền"
                        >
                            {danhMucQuyen.map((result, index) => {
                                return (
                                    <Option value={result.ID}>
                                        {result.tenQuyen}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div
                        className="account-add__button-submit"
                        onClick={this.onSubmit}
                    >
                        Xác Nhận
                    </div>
                </div>
            </div>
        );
    }
}
