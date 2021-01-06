import React, { Component } from "react";
import imageServer from "../../image/server.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../history";

import { Input, message, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            username: "",
            password: "",
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/account")
            .then((response) => {
                this.setState({ account: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    onChangePassWord = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    onSubmit = (username, password) => {
        const { account } = this.state;
        if ((username, password != null && username, password != undefined)) {
            const usernameConfirm = account.find(
                (result) => result.username == username
            );
            if (usernameConfirm != undefined && usernameConfirm !== null) {
                if (password == usernameConfirm.password) {
                    localStorage.setItem(
                        "idAccount",
                        usernameConfirm.ID
                    );
                    localStorage.setItem(
                        "accountType",
                        usernameConfirm.idQuyen
                    );
                    localStorage.setItem(
                        "displayName",
                        usernameConfirm.displayName
                    );
                    if(usernameConfirm.idQuyen == '3' ||usernameConfirm.idQuyen == '1'){
                        history.push("/admin");
                    }
                    else
                    {
                        history.push("/muon-csvc");
                    }
                    window.location.reload();
                } else message.error("Mật Khẩu Không Được Để Trống!!!!");
            } else message.error("Tên Đăng Nhập Và Mật Khẩu Không Được Để Trống!!!!");
        }
    };
    handleKeyDown = (e) => {
        const { username, password } = this.state;
        if ((username, password != null || username, password != undefined)) {
            if (e.key == "Enter") {
                this.onSubmit(username, password);
            }
        } else message.error("Username or password not null");
    };

    render() {
        const { username, password } = this.state;
        return (
            <div className="login">
                <div className="login__form">
                    <div className="login__left">
                        <div className="login__image-wrapper">
                            <img
                                src={imageServer}
                                alt=""
                                className="login__image"
                            />
                        </div>
                    </div>
                    <div className="login__right">
                        <span className="login__title">Đăng Nhập</span>
                        <Input
                            placeholder="Nhập Username"
                            className="login__input"
                            onChange={this.onChangeUserName}
                        />
                        <Input.Password
                            className="login__input"
                            placeholder="Nhập Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            onChange={this.onChangePassWord}
                            onKeyDown={this.handleKeyDown}
                        />
                        <div
                            className="login__button"
                            onClick={() => {
                                this.onSubmit(username, password);
                            }}
                        >
                            Đăng Nhập
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
