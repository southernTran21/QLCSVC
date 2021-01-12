import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message, Tabs } from "antd";
import { DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
var QRCode = require("qrcode.react");

const textDelete = "Bạn có chắc muốn xoá?";

export default class FacilityNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilityCategories: [
                {
                    ID: 0,
                    name: "",
                    QRCODE: "",
                    idCat: "",
                    donViTinh: "",
                    ngayMua: "",
                    hanSuDung: "",
                    giaTien: "",
                    nguoiSuDung: "",
                    donViQuanLy: "",
                    tinhTrang: "",
                    moTa: "",
                },
            ],
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:3001/facility/getNewFacility")
            .then((response) => {
                this.setState({
                    facilityCategories: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    deleteFacilityForCategory = (id) => {
        axios
            .delete("http://localhost:3001/facility/delete/" + id.key)
            .then((res) => {
                message.success("Deleted");
                console.log(res);
            });
        this.setState({
            facilityCategories: this.state.facilityCategories.filter(
                (result) => result.ID !== id.key
            ),
        });
    };
    showQRCODE = (result) => {
        if (result !== "") {
            return <QRCode value={result} renderAs="svg" />;
        }
    };
    hiddenContentDescription = (description) => {
        // console.log(description);
        if (description.length > 100 && description.length != undefined) {
            const str = description.slice(0, 100);

            return (
                <div>
                    <div className="contentDescription">
                        <span>{str}... </span>
                    </div>
                </div>
            );
        } else {
            return <span>{description}</span>;
        }
    };

    showContentNull = (content) => {
        console.log(content);
        if (content == null || content == "null") {
            return <span>null</span>;
        }
        return <span>{content}</span>;
    };

    render() {
        const { facilityCategories } = this.state;
        console.log(facilityCategories);
        return (
            <div className="facility-new">
                <div className="facility__top">
                    <span className="facility__title">Tài Sản Mới</span>
                </div>
                <div className="facility__content">
                    <div className="facility__table">
                        <div className="facility__table-head">
                            <div className="facility__column1">Tên Tài Sản</div>
                            <div className="facility__column2">QRCODE</div>
                            <div className="facility__column3">Loại</div>
                            <div className="facility__column4">Đơn Vị Tính</div>
                            <div className="facility__column5">Ngày Mua</div>
                            <div className="facility__column6">Hạn Sử Dụng</div>
                            <div className="facility__column7">Giá Tiền</div>
                            <div className="facility__column8">
                                Đơn Vị Quản Lý
                            </div>
                            <div className="facility__column9">Mô Tả</div>
                            <div className="facility__column10">Hành Động</div>
                        </div>
                        <div
                            className="facility__table-body"
                            style={{ minHeight: "72vh", maxHeight: "72vh" }}
                        >
                            {facilityCategories.map((item, index) => {
                                return (
                                    <div
                                        className="facility__table-item"
                                        key={index}
                                    >
                                        <div className="facility__column1">
                                            <Link
                                                to={{
                                                    pathname:
                                                        "/admin/taisan-edit",
                                                    search: `?id=${item.ID}`,
                                                }}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </div>
                                        <div className="facility__column2">
                                            <div className="QRCODE">
                                                {this.showQRCODE(item.QRCODE)}
                                            </div>
                                        </div>
                                        <div className="facility__column3">
                                            {this.showContentNull(item.idCat)}
                                        </div>
                                        <div className="facility__column4">
                                            <span>{item.donViTinh}</span>
                                        </div>
                                        <div className="facility__column5">
                                            <span>
                                                {item.ngayMua.split("T")[0] ||
                                                    ""}
                                            </span>
                                        </div>
                                        <div className="facility__column6">
                                            <span>{item.hanSuDung}</span>
                                        </div>
                                        <div className="facility__column7">
                                            <span>
                                                {Number(
                                                    item.giaTien
                                                ).toLocaleString("el-GR")}
                                            </span>
                                        </div>
                                        <div className="facility__column8">
                                            {this.showContentNull(
                                                item.donViQuanLy
                                            )}
                                        </div>
                                        <div className="facility__column9">
                                            <span>
                                                {this.hiddenContentDescription(
                                                    item.moTa
                                                )}
                                            </span>
                                        </div>
                                        <div className="facility__column10">
                                            <Popconfirm
                                                placement="top"
                                                title={textDelete}
                                                onConfirm={() => {
                                                    this.deleteCategory(
                                                        item.ID
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
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
