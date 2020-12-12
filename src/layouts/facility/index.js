import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message, Tabs, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const textDelete = "Bạn có chắc muốn xoá?";

export default class Facility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            facility: [
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
                    nguoiQuanLy: "",
                    tinhTrang: "",
                    moTa: "",
                },
            ],
            facilityCategories: [],
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
            .get("http://localhost:3001/facility")
            .then((response) => {
                this.setState({ facility: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteCategory = (id) => {
        axios
            .delete("http://localhost:3001/facility/delete/" + id.key)
            .then((res) => {
                message.success("Deleted");
                console.log(res);
            });
        this.setState({
            facility: this.state.facility.filter(
                (result) => result.ID !== id.key
            ),
        });
    };
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
        axios
            .get("http://localhost:3001/facility/getFacilityForCategory/" + key)
            .then((response) => {
                this.setState({ facilityCategories: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { categories, facility, facilityCategories } = this.state;

        const dataFacilityAll = facility.map((result, index) => {
            return {
                key: result.ID,
                name: result.name,
                QRCODE: result.QRCODE,
                idCat: result.idCat,
                donViTinh: result.donViTinh,
                ngayMua: result.ngayMua.split("T")[0],
                hanSuDung: result.hanSuDung,
                giaTien: result.giaTien,
                nguoiSuDung: result.nguoiSuDung,
                nguoiQuanLy: result.nguoiQuanLy,
                tinhTrang: result.tinhTrang,
                moTa: result.moTa,
            };
        });

        const dataFacilityForCategory = facilityCategories.map((result, index) => {
            return {
                key: result.ID,
                name: result.name,
                QRCODE: result.QRCODE,
                idCat: result.idCat,
                donViTinh: result.donViTinh,
                ngayMua: result.ngayMua.split("T")[0],
                hanSuDung: result.hanSuDung,
                giaTien: result.giaTien,
                nguoiSuDung: result.nguoiSuDung,
                nguoiQuanLy: result.nguoiQuanLy,
                tinhTrang: result.tinhTrang,
                moTa: result.moTa,
            };
        });

        const columns = [
            {
                title: "Tên Tài Sản",
                width: 250,
                dataIndex: "name",
                key: "name",
                fixed: "left",
                render: (text) => <a>{text}</a>
            },
            { title: "QRCODE", dataIndex: "QRCODE", key: "1", width: 200 },
            { title: "Mã Loại", dataIndex: "idCat", key: "2", width: 200 },
            {
                title: "Đơn Vị Tính",
                dataIndex: "donViTinh",
                key: "3",
                width: 200,
            },
            { title: "Ngày Mua", dataIndex: "ngayMua", key: "4", width: 200 },
            {
                title: "Hạn Sử Dụng",
                dataIndex: "hanSuDung",
                key: "5",
                width: 200,
            },
            { title: "Giá Tiền", dataIndex: "giaTien", key: "6", width: 200 },
            {
                title: "Người Sử Dụng",
                dataIndex: "nguoiSuDung",
                key: "7",
                width: 200,
            },
            {
                title: "Người Quản Lý",
                dataIndex: "nguoiQuanLy",
                key: "8",
                width: 200,
            },
            {
                title: "Tình Trạng",
                dataIndex: "tinhTrang",
                key: "9",
                width: 200,
            },
            { title: "Mô Tả", dataIndex: "moTa", key: "10", width: 200 },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (key) => (
                    <Popconfirm
                        placement="top"
                        title={textDelete}
                        onConfirm={() => {
                            this.deleteCategory(key);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="iconDelete">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                ),
            },
        ];
        const columnsDataFacilityForCategory = [
            {
                title: "Tên Tài Sản",
                width: 250,
                dataIndex: "name",
                key: "name",
                fixed: "left",
                render: (text) => <a>{text}</a>
            },
            { title: "QRCODE", dataIndex: "QRCODE", key: "1", width: 200 },
            { title: "Mã Loại", dataIndex: "idCat", key: "2", width: 200 },
            {
                title: "Đơn Vị Tính",
                dataIndex: "donViTinh",
                key: "3",
                width: 200,
            },
            { title: "Ngày Mua", dataIndex: "ngayMua", key: "4", width: 200 },
            {
                title: "Hạn Sử Dụng",
                dataIndex: "hanSuDung",
                key: "5",
                width: 200,
            },
            { title: "Giá Tiền", dataIndex: "giaTien", key: "6", width: 200 },
            {
                title: "Người Sử Dụng",
                dataIndex: "nguoiSuDung",
                key: "7",
                width: 200,
            },
            {
                title: "Người Quản Lý",
                dataIndex: "nguoiQuanLy",
                key: "8",
                width: 200,
            },
            {
                title: "Tình Trạng",
                dataIndex: "tinhTrang",
                key: "9",
                width: 200,
            },
            { title: "Mô Tả", dataIndex: "moTa", key: "10", width: 200 },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (key) => (
                    <Popconfirm
                        placement="top"
                        title={textDelete}
                        onConfirm={() => {
                            this.deleteFacilityForCategory(key);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="iconDelete">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                ),
            },
        ];

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
                    </div>
                </div>
                <div className="facility__content">
                    <Tabs
                        defaultActiveKey="0"
                        onChange={this.handleChangeDataFacilityForCategory}
                    >
                        <TabPane tab="Tất Cả" key="0">
                            <Table
                                columns={columns}
                                dataSource={dataFacilityAll}
                                scroll={{ x: 1300 }}
                            />
                        </TabPane>
                        {categories.map((result, index) => {
                            return (
                                <TabPane tab={result.name} key={result.ID}>
                                    <Table
                                        columns={columnsDataFacilityForCategory}
                                        dataSource={dataFacilityForCategory}
                                        scroll={{ x: 1300 }}
                                    />
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
        );
    }
}
