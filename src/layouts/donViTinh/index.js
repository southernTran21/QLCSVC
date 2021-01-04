import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const text = "Bạn có chắc muốn xoá?";

export default class DonViTinh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dvt: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/donvitinh")
            .then((response) => {
                this.setState({ dvt: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteCategory = (id) => {
        console.log(id);
        axios
            .delete("http://localhost:3001/donvitinh/delete/" + id)
            .then((res) => {
                if (res.data == "Error") {
                    message.error("Vui Lòng Kiểm Tra lại Thông Tin Cần Xoá");
                } else {
                    message.success("Deleted");
                    this.setState({
                        dvt: this.state.dvt.filter(
                            (result) => result.ID !== id
                        ),
                    });
                }
            });
    };

    render() {
        const { dvt } = this.state;

        return (
            <div className="don-vi-tinh">
                <div className="categories__top">
                    <span className="categories__title">Đơn Vị Tính</span>
                    <div className="categories__right">
                        <div className="categories__button">
                            <PlusOutlined />
                            <Link to="/admin/don-vi-tinh-add">
                                <span className="categories__button__text">
                                    Thêm mới
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="categories__table">
                    <div className="categories__table__header">
                        <div className="categories__table__column--1">ID</div>
                        <div className="categories__table__column--2">Tên</div>
                        <div className="categories__table__column--4">
                            Hành Động
                        </div>
                    </div>
                    <div className="categories__table__body--wrapper">
                        {dvt.map((result, index) => {
                            if (result != null) {
                                return (
                                    <div
                                        className="categories__table__body"
                                        key={index}
                                    >
                                        <div className="categories__table__column--1">
                                            {result.ID}
                                        </div>
                                        <div className="categories__table__column--2">
                                            {result.name}
                                        </div>
                                        <div className="categories__table__column--4">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.deleteCategory(
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
