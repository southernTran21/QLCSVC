import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "../../../history";

import { LeftCircleOutlined, InfoCircleOutlined, HistoryOutlined } from "@ant-design/icons";
import { Input, message } from "antd";

export default class FacilityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facility: {
                QRCODE: "",
                donViQuanLy: "",
                donViTinh: "",
                giaTien: 0,
                hanSuDung: 0,
                id: 0,
                idCat: 0,
                moTa: "",
                name: "",
                nameCat: "",
                ngayMua: "",
            },
        };
    }

    componentDidMount() {
        const PATH = window.location.search.match(/id=(.*)\b/)[1];
        if (PATH !== "" || PATH != null) {
            axios
                .get("http://localhost:3001/facility/" + PATH)
                .then((response) => {
                    this.setState({
                        facility: response.data[0],
                    });
                });
        }
    }
    render() {
        const { facility } = this.state;
        console.log(facility);
        return (
            <div className="facility-detail">
                <div className="categories-add__top">
                    <Link to="/admin/taisan" className="categories-add__icon">
                        <LeftCircleOutlined />
                    </Link>
                    <span className="categories-add__title">
                        {facility.name}
                    </span>
                </div>
                <div className="facility-detail__body">
                    <div className="facility-detail__body-top">
                        <InfoCircleOutlined />
                        <span className="facility-detail__body-title">
                            THÔNG TIN TÀI SẢN
                        </span>
                    </div>
                    <div className="facility-detail__content">
                        <div className="facility-detail__left">
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Mã Tài Sản:
                                </p>
                                <span>{facility.id}</span>
                            </div>
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Tên Tài Sản:
                                </p>
                                <span>{facility.name}</span>
                            </div>
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Mã QRCode:
                                </p>
                                <span>{facility.QRCODE}</span>
                            </div>

                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Tên Loại Tài Sản:
                                </p>
                                <span>{facility.nameCat}</span>
                            </div>
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Đơn Vị Quản Lý:
                                </p>
                                <span>{facility.donViQuanLy}</span>
                            </div>
                        </div>
                        <div className="facility-detail__right">
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Đơn Vị Tính:
                                </p>
                                <span>{facility.donViTinh}</span>
                            </div>

                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Giá Tiền:
                                </p>
                                <span>
                                    {Number(facility.giaTien).toLocaleString(
                                        "el-GR"
                                    )}
                                </span>
                            </div>

                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Ngày Mua:
                                </p>
                                <span>
                                    {facility.ngayMua.split("T")[0] || ""}
                                </span>
                            </div>
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Hạn Sử Dụng:
                                </p>
                                <span>{facility.hanSuDung} Tháng</span>
                            </div>
                            <div className="facility-detail__result">
                                <p className="facility-detail__result-title">
                                    Mô Tả:
                                </p>
                                <span style={{width: "32rem"}}>{facility.moTa}</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="facility-detail__body-top">
                        <HistoryOutlined />
                            <span className="facility-detail__body-title">
                                LỊCH SỬ MƯỢN TÀI SẢN
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
