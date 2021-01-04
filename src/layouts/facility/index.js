import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message, Tabs, Table } from "antd";
import Pagination from "react-js-pagination";
import {
    PlusOutlined,
    DeleteOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
var QRCode = require("qrcode.react");
const { TabPane } = Tabs;

const textDelete = "Bạn có chắc muốn xoá?";

export default class Facility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 0,
            page: 1,
            categories: [],
            facilityCategories: [
                {
                    ID: 0,
                    name: "",
                    QRCODE: "",
                    nameCat: "",
                    donViTinh: "",
                    ngayMua: "",
                    hanSuDung: "",
                    giaTien: "",
                    nguoiSuDung: "",
                    nguoiQuanLy: "",
                    tinhTrang: "",
                    moTa: "",
                },
            ],
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
        axios
            .get("http://localhost:3001/facility/getFacilityForCategory/all")
            .then((response) => {
                this.setState({
                    facilityCategories: response.data[0],
                    pageCount: response.data[1],
                    page: 1,
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

    handleChangeDataFacilityForCategory = (key) => {
        if (key > 0) {
            axios
                .get(
                    "http://localhost:3001/facility/getFacilityForCategory/" +
                        key
                )
                .then((response) => {
                    this.setState({
                        facilityCategories: response.data[0],
                        pageCount: response.data[1],
                        page: 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .get(
                    "http://localhost:3001/facility/getFacilityForCategory/all"
                )
                .then((response) => {
                    this.setState({
                        facilityCategories: response.data[0],
                        pageCount: response.data[1],
                        page: 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    showQRCODE = (result) => {
        if (result !== "") {
            return <QRCode value={result} renderAs="svg" />;
        }
    };

    handleChangeDataPag = (page, key) => {
        console.log(page);
        if (page < 2 && key == 0) {
            console.log(page);
            this.handleChangeDataFacilityForCategory(0);
        } else if (page < 2 && key > 0) {
            console.log(page);
            this.handleChangeDataFacilityForCategory(key);
        } else {
            axios
                .get(
                    "http://localhost:3001/facility/getFacilityPagination/" +
                        page
                )
                .then((response) => {
                    this.setState({
                        facilityCategories: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
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

    render() {
        const { categories, facilityCategories, pageCount, page } = this.state;
        console.log(facilityCategories);
        return (
            <div className="facility">
                <div className="facility__top">
                    <span className="facility__title">Quản Lý Tài Sản</span>
                    <div className="facility__right">
                        <div className="facility__button">
                            <PlusOutlined />
                            <Link to="/admin/taisan-add">
                                <span className="facility__button__text">
                                    Thêm mới
                                </span>
                            </Link>
                        </div>
                        <div className="facility__button">
                            <PlusOutlined />
                            <Link to="/admin/taisan-add-excel">
                                <span className="facility__button__text">
                                    Thêm mới bằng Excel
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="facility__content">
                    <Tabs
                        defaultActiveKey="0"
                        defaultValue="0"
                        onChange={this.handleChangeDataFacilityForCategory}
                    >
                        <TabPane tab="Tất Cả" key="0">
                            <div className="facility__table">
                                <div className="facility__table-head">
                                    <div className="facility__column1">
                                        Tên Tài Sản
                                    </div>
                                    <div className="facility__column2">
                                        QRCODE
                                    </div>
                                    <div className="facility__column3">
                                        Tên Loại
                                    </div>
                                    <div className="facility__column4">
                                        Đơn Vị Tính
                                    </div>
                                    <div className="facility__column5">
                                        Ngày Mua
                                    </div>
                                    <div className="facility__column6">
                                        Hạn Sử Dụng
                                    </div>
                                    <div className="facility__column7">
                                        Giá Tiền
                                    </div>
                                    <div className="facility__column8">
                                        Đơn Vị Quản Lý
                                    </div>
                                    <div className="facility__column9">
                                        Mô Tả
                                    </div>
                                    <div className="facility__column10">
                                        Hành Động
                                    </div>
                                </div>
                                <div className="facility__table-body">
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
                                                                "/admin/taisan-detail",
                                                            search: `?id=${item.QRCODE}`,
                                                        }}
                                                    >
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </div>
                                                <div className="facility__column2">
                                                    <div className="QRCODE">
                                                        {this.showQRCODE(
                                                            item.QRCODE
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="facility__column3">
                                                    <span>{item.nameCat}</span>
                                                </div>
                                                <div className="facility__column4">
                                                    <span>
                                                        {item.donViTinh}
                                                    </span>
                                                </div>
                                                <div className="facility__column5">
                                                    <span>
                                                        {item.ngayMua.split(
                                                            "T"
                                                        )[0] || ""}
                                                    </span>
                                                </div>
                                                <div className="facility__column6">
                                                    <span>
                                                        {item.hanSuDung}
                                                    </span>
                                                </div>
                                                <div className="facility__column7">
                                                    <span>
                                                        {Number(
                                                            item.giaTien
                                                        ).toLocaleString(
                                                            "el-GR"
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="facility__column8">
                                                    <span>
                                                        {item.donViQuanLy}
                                                    </span>
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
                            <div className="facility__pagination">
                                <button
                                    className="facility__button-previous"
                                    disabled={page <= 1}
                                    onClick={() => {
                                        this.handleChangeDataPag(page - 1, 0);
                                        this.setState({
                                            page: page - 1,
                                        });
                                    }}
                                >
                                    <LeftOutlined />
                                </button>
                                <div className="facility__count-pag">
                                    {page} / {pageCount}
                                </div>
                                <button
                                    className="facility__button-next"
                                    disabled={page >= pageCount}
                                    onClick={() => {
                                        this.handleChangeDataPag(page + 1, 0);
                                        this.setState({
                                            page: page + 1,
                                        });
                                    }}
                                >
                                    <RightOutlined />
                                </button>
                            </div>
                        </TabPane>
                        {categories.map((result, index) => {
                            return (
                                <TabPane tab={result.name} key={result.ID}>
                                    <div className="facility__table">
                                        <div className="facility__table-head">
                                            <div className="facility__column1">
                                                Tên Tài Sản
                                            </div>
                                            <div className="facility__column2">
                                                QRCODE
                                            </div>
                                            <div className="facility__column3">
                                                Tên Loại
                                            </div>
                                            <div className="facility__column4">
                                                Đơn Vị Tính
                                            </div>
                                            <div className="facility__column5">
                                                Ngày Mua
                                            </div>
                                            <div className="facility__column6">
                                                Hạn Sử Dụng
                                            </div>
                                            <div className="facility__column7">
                                                Giá Tiền
                                            </div>
                                            <div className="facility__column8">
                                                Đơn Vị Quản Lý
                                            </div>
                                            <div className="facility__column9">
                                                Mô Tả
                                            </div>
                                            <div className="facility__column10">
                                                Hành Động
                                            </div>
                                        </div>
                                        <div className="facility__table-body">
                                            {facilityCategories.map(
                                                (item, index) => {
                                                    return (
                                                        <div
                                                            className="facility__table-item"
                                                            key={index}
                                                        >
                                                            <div className="facility__column1">
                                                                <Link
                                                                    to={{
                                                                        pathname:
                                                                            "/admin/taisan-detail",
                                                                        search: `?id=${item.QRCODE}`,
                                                                    }}
                                                                >
                                                                    <span>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="facility__column2">
                                                                <div className="QRCODE">
                                                                    {this.showQRCODE(
                                                                        item.QRCODE
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="facility__column3">
                                                                <span>
                                                                    {
                                                                        item.nameCat
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="facility__column4">
                                                                <span>
                                                                    {
                                                                        item.donViTinh
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="facility__column5">
                                                                <span>
                                                                    {item.ngayMua.split(
                                                                        "T"
                                                                    )[0] || ""}
                                                                </span>
                                                            </div>
                                                            <div className="facility__column6">
                                                                <span>
                                                                    {
                                                                        item.hanSuDung
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="facility__column7">
                                                                <span>
                                                                    {Number(
                                                                        item.giaTien
                                                                    ).toLocaleString(
                                                                        "el-GR"
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="facility__column8">
                                                                <span>
                                                                    {
                                                                        item.donViQuanLy
                                                                    }
                                                                </span>
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
                                                                    title={
                                                                        textDelete
                                                                    }
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
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="facility__pagination">
                                        <button
                                            className="facility__button-previous"
                                            disabled={page <= 1}
                                            onClick={() => {
                                                this.handleChangeDataPag(
                                                    page - 1,
                                                    result.ID
                                                );
                                                this.setState({
                                                    page: page - 1,
                                                });
                                            }}
                                        >
                                            <LeftOutlined />
                                        </button>
                                        <div className="facility__count-pag">
                                            {page} / {pageCount}
                                        </div>
                                        <button
                                            className="facility__button-next"
                                            disabled={page >= pageCount}
                                            onClick={() => {
                                                this.handleChangeDataPag(
                                                    page + 1,
                                                    result.ID
                                                );
                                                this.setState({
                                                    page: page + 1,
                                                });
                                            }}
                                        >
                                            <RightOutlined />
                                        </button>
                                    </div>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
        );
    }
}
