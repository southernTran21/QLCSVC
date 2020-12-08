import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
const { Option } = Select;

export default class AccountAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            idQuyen: "",
            danhMucQuyen: [],
        };
    }

    componentDidMount() {
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
    handleChangeQuyen = (value) => {
        this.setState({
            idQuyen: value,
        });
    };

    onSubmit = (e) => {
        const { username, password, idQuyen } = this.state;
        axios.post("http://localhost:3001/account/add", {
            username: username,
            password: password,
            idQuyen: idQuyen,
        });
    };
    render() {
        const { danhMucQuyen } = this.state
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
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="account-add__input">
                        <span>Mật Khẩu</span>
                        <Input
                            placeholder="Nhập Tên Đăng Nhập"
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="account-add__input">
                    <span>Quyền</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={this.handleChangeQuyen}
                            placeholder="Chọn Quyền"
                        >
                            {danhMucQuyen.map((result, index) => {
                                return(
                                <Option value={result.ID}>{result.tenQuyen}</Option>
                                )
                            }
                            )}
                            
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
