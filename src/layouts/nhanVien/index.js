import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const text = "Bạn có chắc muốn xoá?";

export default class NhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVien: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/nhanvien")
            .then((response) => {
                this.setState({ nhanVien: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    deleteNV = (id) => {
        console.log(id)
        axios
            .delete("http://localhost:3001/nhanvien/delete/" + id)
            .then((res) => message.success("Deleted"));
        this.setState({
            nhanvien: this.state.nhanvien.filter(
                (result) => result.ID !== id
            ),
        });
    };
    render() {
        const {nhanVien} = this.state
        return (
            <div className="nv">
                <div className="nv__top">
                    <span className="nv__title">Quản Lý Nhân Viên</span>
                    <div className="nv__right">
                        <div className="nv__button">
                            <PlusOutlined />
                            <Link to="/admin/nhanvien-add">
                                <span className="nv__button__text">
                                    Thêm mới
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="nv__table">
                    <div className="nv__table__header">
                        <div className="nv__table__column--1">Tên Nhân Viên</div>
                        <div className="nv__table__column--2">Số Điện Thoại</div>
                        <div className="nv__table__column--3">
                            Địa Chỉ
                        </div>
                        <div className="nv__table__column--4">
                            Hành Động
                        </div>
                    </div>
                    <div className="nv__table__body--wrapper">
                        {nhanVien.map((result, index) => {
                            if (result != null) {
                                return (
                                    <div
                                        className="nv__table__body"
                                        key={index}
                                    >
                                        <div className="nv__table__column--1">
                                            {result.tenNV}
                                        </div>
                                        <div className="nv__table__column--2">
                                            {result.soDienThoai}
                                        </div>
                                        <div className="nv__table__column--3">
                                            {result.diaChi}
                                        </div>
                                        <div className="nv__table__column--4">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.deleteNV(
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
        )
    }
}
