import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const text = "Bạn có chắc muốn xoá?";

export default class DonViQuanLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donViQuanLy: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/donViQuanLy")
            .then((response) => {
                this.setState({ donViQuanLy: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    deleteNV = (id) => {
        console.log(id);
        axios
            .delete("http://localhost:3001/donViQuanLy/delete/" + id)
            .then((res) => message.success("Deleted"));
        this.setState({
            donViQuanLy: this.state.donViQuanLy.filter((result) => result.ID !== id),
        });
    };
    render() {
        const { donViQuanLy } = this.state
        return (
            <div className="don-vi-quan-ly">
                <div className="don-vi-quan-ly__top">
                    <span className="don-vi-quan-ly__title">
                        Quản Lý Đơn Vị Quản Lý
                    </span>
                    <div className="don-vi-quan-ly__right">
                        <div className="don-vi-quan-ly__button">
                            <PlusOutlined />
                            <Link to="/admin/don-vi-quan-ly-add">
                                <span className="don-vi-quan-ly__button__text">
                                    Thêm mới
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="don-vi-quan-ly__table">
                    <div className="don-vi-quan-ly__table__header">
                        <div className="don-vi-quan-ly__table__column--1">
                            Tên Đơn Vị
                        </div>
                        <div className="don-vi-quan-ly__table__column--2">
                            Số Điện Thoại
                        </div>
                        <div className="don-vi-quan-ly__table__column--3">
                            Email
                        </div>
                        <div className="don-vi-quan-ly__table__column--4">
                            Hành Động
                        </div>
                    </div>
                    <div className="don-vi-quan-ly__table__body--wrapper">
                        {donViQuanLy.map((result, index) => {
                            console.log(result);
                            if (result != null) {
                                return (
                                    <div
                                        className="don-vi-quan-ly__table__body"
                                        key={index}
                                    >
                                        <div className="don-vi-quan-ly__table__column--1">
                                            {result.name}
                                        </div>
                                        <div className="don-vi-quan-ly__table__column--2">
                                            {result.soDienThoai}
                                        </div>
                                        <div className="don-vi-quan-ly__table__column--3">
                                            {result.email}
                                        </div>
                                        <div className="don-vi-quan-ly__table__column--4">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.delete(result.ID);
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
