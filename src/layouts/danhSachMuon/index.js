import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export default class DanhSachMuon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHistory: [],
            isVisible: false,
            detail: [{ ID: "" }],
        };
    }
    componentDidMount() {
        axios.get("http://localhost:3001/muon-tai-san/").then((response) => {
            this.setState({ dataHistory: response.data });
        });
    }

    handleShowModal = (ID) => {
        console.log(ID);
        axios
            .get("http://localhost:3001/chi-tiet-muon-tai-san/" + ID)
            .then((response) => {
                console.log(response);
                this.setState({
                    detail: response.data,
                });
            });
    };

    render() {
        const { dataHistory, detail } = this.state;
        console.log(detail);
        return (
            <div className="danh-sach-muon">
                <div className="account__top">
                    <span className="account__title">Danh Sách Mượn</span>
                </div>
                <div className="danh-sach-muon__table-wrapper">
                    <div className="danh-sach-muon__table">
                        <div className="danh-sach-muon__table-head">
                            <div className="danh-sach-muon__column1">ID</div>
                            <div className="danh-sach-muon__column2">
                                Họ Tên
                            </div>
                            <div className="danh-sach-muon__column3">
                                Số Điện Thoại
                            </div>
                            <div className="danh-sach-muon__column4">CMND</div>
                            <div className="danh-sach-muon__column5">
                                Ngày Mượn
                            </div>
                            <div className="danh-sach-muon__column6">
                                Ngày Trả
                            </div>
                            <div className="danh-sach-muon__column7">
                                Số Lượng
                            </div>
                            <div className="danh-sach-muon__column8">
                                Nhân Viên
                            </div>
                            <div className="danh-sach-muon__column9">
                                Tình trạng
                            </div>
                        </div>
                        <div className="danh-sach-muon__table-body">
                            {dataHistory.map((item, index) => {
                                return (
                                    <div
                                        className="danh-sach-muon__table-item"
                                        key={index}
                                    >
                                        <div className="danh-sach-muon__column1">
                                            <span
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    this.handleShowModal(
                                                        item.ID
                                                    );
                                                    this.setState({
                                                        isVisible: true,
                                                    });
                                                }}
                                            >
                                                {item.ID}
                                            </span>
                                        </div>
                                        <div className="danh-sach-muon__column2">
                                            {item.HoTen}
                                        </div>
                                        <div className="danh-sach-muon__column3">
                                            <span>{item.SoDienThoai}</span>
                                        </div>
                                        <div className="danh-sach-muon__column4">
                                            <span>{item.CMND}</span>
                                        </div>
                                        <div className="danh-sach-muon__column5">
                                            <span>{item.NgayMuon}</span>
                                        </div>
                                        <div className="danh-sach-muon__column6">
                                            <span>{item.NgayTra}</span>
                                        </div>
                                        <div className="danh-sach-muon__column7">
                                            <span>{item.SoLuong}</span>
                                        </div>
                                        <div className="danh-sach-muon__column8">
                                            <span>{item.MaNhanVien}</span>
                                        </div>
                                        <div className="danh-sach-muon__column9">
                                            <span>
                                                {item.tinhTrang == 0
                                                    ? "Chưa trả"
                                                    : "Đã Trả"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <Modal
                    title={`Chi Tiết Mượn: #${detail[0].ID}`}
                    centered
                    visible={this.state.isVisible}
                    onOk={() => this.setState({ isVisible: false })}
                    onCancel={() => this.setState({ isVisible: false })}
                    okText="Xác nhận"
                    cancelText="Huỷ"
                >
                    <div className="danh-sach-muon__modal-table">
                        <div className="danh-sach-muon__modal-head">
                            <div className="danh-sach-muon__modal-column1">
                                Tên Tài Sản
                            </div>
                            <div className="danh-sach-muon__modal-column2">
                                Mã QRCODE
                            </div>
                            <div className="danh-sach-muon__modal-column3">
                                Số Lượng
                            </div>
                        </div>
                        {detail.map((result, index) => {
                            return (
                                <div
                                    className="danh-sach-muon__modal-body"
                                    key={index}
                                >
                                    <div className="danh-sach-muon__modal-column1">
                                        {result.name}
                                    </div>
                                    <div className="danh-sach-muon__modal-column2">
                                        {result.QRCODE}
                                    </div>
                                    <div className="danh-sach-muon__modal-column3">
                                        {result.SoLuong}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
}
