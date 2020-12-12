import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const text = "Bạn có chắc muốn xoá?";

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
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
    deleteAccount = (id) => {
        console.log(id);
        axios
            .delete("http://localhost:3001/account/delete/" + id)
            .then((res) => message.success("Deleted"));
        this.setState({
            account: this.state.account.filter((result) => result.ID !== id),
        });
    };
    render() {
        const { account } = this.state;
        return (
            <div className="account">
                <div className="account__top">
                    <span className="account__title">Tài Khoản</span>
                    <div className="account__right">
                        <div className="account__button">
                            <PlusOutlined />
                            <Link to="/admin/account-add">
                                <span className="account__button__text">
                                    Thêm mới
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="account__table">
                    <div className="account__table__header">
                        <div className="account__table__column--1">
                            Username
                        </div>
                        <div className="account__table__column--2">
                            Password
                        </div>
                        <div className="account__table__column--3">Quyền</div>
                        <div className="account__table__column--4">Tên Hiển Thị</div>
                        <div className="account__table__column--5">
                            Hành Động
                        </div>
                    </div>
                    <div className="account__table__body--wrapper">
                        {account.map((result, index) => {
                            if (result != null) {
                                return (
                                    <div
                                        className="account__table__body"
                                        key={index}
                                    >
                                        <div className="account__table__column--1">
                                            {result.username}
                                        </div>
                                        <div className="account__table__column--2">
                                            {result.password}
                                        </div>
                                        <div className="account__table__column--3">
                                            {result.idQuyen}
                                        </div>
                                        <div className="account__table__column--4">
                                            {result.displayName}
                                        </div>
                                        <div className="account__table__column--5">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.deleteAccount(
                                                        result.ID
                                                    );
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <div className="iconDelete">
                                                    <DeleteOutlined />
                                                </div>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
