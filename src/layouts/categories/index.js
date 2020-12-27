import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const text = "Bạn có chắc muốn xoá?";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/categories")
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteCategory = (id) => {
        console.log(id);
        axios
            .delete("http://localhost:3001/categories/delete/" + id)
            .then((res) => {
                if (res.data == "Error") {
                    message.error("Vui Lòng Kiểm Tra lại Thông Tin Cần Xoá");
                } else {
                    message.success("Deleted");
                    this.setState({
                        categories: this.state.categories.filter(
                            (result) => result.ID !== id
                        ),
                    });
                }
            });
    };

    render() {
        const { categories } = this.state;
        return (
            <div className="categories">
                <div className="categories__top">
                    <span className="categories__title">Loại Tài Sản</span>
                    <div className="categories__right">
                        <div className="categories__button">
                            <PlusOutlined />
                            <Link to="/admin/categories-add">
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
                        <div className="categories__table__column--3">
                            Mô Tả
                        </div>
                        <div className="categories__table__column--4">
                            Hành Động
                        </div>
                    </div>
                    <div className="categories__table__body--wrapper">
                        {categories.map((result, index) => {
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
                                            <Link
                                                to={{
                                                    pathname:
                                                        "/admin/categories-edit",
                                                    search: `?id=${result.ID}`,
                                                }}
                                            >
                                                {result.name}
                                            </Link>
                                        </div>
                                        <div className="categories__table__column--3">
                                            {result.description}
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

export default Categories;
