import React, { Component } from "react";
import {
    LeftCircleOutlined,
    HistoryOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Drawer, Select, Input, DatePicker, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const { Option } = Select;

export default class MuonTaiSan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            categories: [],
            facilities: [],
            name: "",
            sdt: "",
            cmnd: "",
            date: "",
            valueCategory: "",
            orderList: [],
            dataHistory: [],
            total: 0,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3001/categories").then((response) => {
            this.setState({ categories: response.data });
        });
        axios
            .get("http://localhost:3001/facility")
            .then((response) => {
                this.setState({
                    facilities: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        this.handleShowInfCus();
    }

    onClose = () => {
        this.setState({
            isVisible: false,
        });
    };

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onChangeSDT = (e) => {
        this.setState({
            sdt: e.target.value,
        });
    };

    onChangeCMND = (e) => {
        this.setState({
            cmnd: e.target.value,
        });
    };

    onChangeDate = (date, dateString) => {
        console.log(dateString);
        this.setState({
            date: dateString,
        });
    };

    handleChange = (value) => {
        console.log(value);
        if (value == "0") {
            axios
                .get("http://localhost:3001/facility")
                .then((response) => {
                    this.setState({
                        facilities: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (value != null || value != undefined || value > 1) {
            axios
                .get("http://localhost:3001/facility/getForCat/" + value)
                .then((response) => {
                    this.setState({
                        facilities: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    handleClickAddFacility = (ID, name) => {
        let listOrder = this.state.orderList;
        let { total } = this.state;
        const isCheckIDExits = listOrder.some(
            (result) => result.ID.toString() == ID.toString()
        );

        if (isCheckIDExits == false) {
            const orderItem = {
                ID: ID,
                name: name,
                quantity: 1,
            };
            listOrder.push(orderItem);
            total += 1;
        } else {
            const index = listOrder.findIndex(
                (result) => result.ID.toString() == ID.toString()
            );
            listOrder[index].quantity += 1;
            total += 1;
        }
        this.setState({
            orderList: listOrder,
            total: total,
        });
    };

    handleShowInfCus = () => {
        const isCheck = localStorage.getItem("isCheck");
        const valueInput = localStorage.getItem("valueInput");
        if (isCheck == 1) {
            axios
                .get("http://localhost:3001/muon-tai-san/phone/" + valueInput)
                .then((response) => {
                    if (response.data.length == 0) {
                        this.setState({
                            sdt: valueInput,
                        });
                    } else {
                        this.setState({
                            name: response.data[0].HoTen,
                            sdt: response.data[0].SoDienThoai,
                            cmnd: response.data[0].CMND,
                            dataHistory: response.data,
                        });
                    }
                });
        } else {
            axios
                .get("http://localhost:3001/muon-tai-san/cmnd/" + valueInput)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.length == 0) {
                        this.setState({
                            cmnd: valueInput,
                        });
                    } else {
                        this.setState({
                            name: response.data[0].HoTen,
                            sdt: response.data[0].SoDienThoai,
                            cmnd: response.data[0].CMND,
                            dataHistory: response.data,
                        });
                    }
                });
        }
    };

    handleDeleteItemOrderList = (index) => {
        const { orderList } = this.state;
        let remove = orderList.splice(index, 1);
        this.setState({
            orderList,
        });
    };

    handleSubmitAdd = () => {
        const { orderList, name, sdt, cmnd, total, dataHistory } = this.state;
        let date_ob = new Date();

        // current date
        let dateS = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        const IDBill = year + month + dateS + hours + minutes + seconds;
        const dateSystem = year + "-" + month + "-" + dateS;
        const NV = localStorage.getItem("displayName");
        if (orderList.length == 0) {
            message.error("Không Có Dữ Liệu Để Thêm");
        } else {
            if (this.state.date.length > 1) {
                if (Date.parse(this.state.date) < Date.parse(dateSystem)) {
                    message.error(
                        "Ngày Trả Không Được Phép Nhỏ Hơn Ngày Hiện Tại"
                    );
                } else {
                    if (dataHistory.length >= 2) {
                        message.error("Người Mượn Đã Mượn Quá Số Lần Mượn");
                    } else {
                        axios
                            .post("http://localhost:3001/muon-tai-san/add", {
                                ID: IDBill,
                                MaNhanVien: NV,
                                SoLuong: total,
                                SoDienThoai: sdt,
                                CMND: cmnd,
                                HoTen: name,
                                NgayMuon: dateSystem,
                                NgayTra: this.state.date,
                            })
                            .then((res) => {
                                message.success("Đã Lưu");
                            });
                        orderList.map((result) => {
                            const { ID, quantity } = result;
                            axios
                                .post(
                                    "http://localhost:3001/chi-tiet-muon-tai-san/add",
                                    {
                                        ID: IDBill,
                                        IDFacility: ID,
                                        quantity: quantity,
                                    }
                                )
                                .then((res) => {
                                    this.setState({
                                        orderList: [],
                                    });
                                });
                        });
                    }
                }
            } else {
                message.error("Ngày Trả Không Được Để Trống");
            }
        }
    };

    handleShowHistory = () => {
        const { dataHistory } = this.state;
        console.log(dataHistory);
        if (dataHistory.length < 1) {
            return <div className="muon__history">Chưa mượn</div>;
        } else if (dataHistory.length >= 1) {
            return dataHistory.map((result, index) => {
                return (
                    <div className="muon__history-item">
                        <p className="muon__history-ngay-muon">
                            Ngày Mượn: {result.NgayMuon}
                        </p>
                        <p className="muon__history-ngay-muon">
                            Số Lượng: {result.SoLuong}
                        </p>
                        <p className="muon__history-ngay-muon">
                            Ngày Trả: {result.NgayTra}
                        </p>
                    </div>
                );
            });
        } else {
            return <div className="muon__history">Chưa mượn</div>;
        }
    };

    render() {
        const {
            isVisible,
            categories,
            facilities,
            name,
            sdt,
            cmnd,
            orderList,
            total,
        } = this.state;
        return (
            <div className="muon">
                <div className="muon__navbar">
                    <div className="muon__icon-back">
                        <Link to="/muon-csvc">
                            <LeftCircleOutlined />
                        </Link>
                    </div>
                    <div
                        className="muon__icon-history"
                        onClick={() => {
                            this.setState({
                                isVisible: true,
                            });
                        }}
                    >
                        <HistoryOutlined />
                    </div>
                    <Drawer
                        title="Lịch Sử Mượn"
                        placement="right"
                        closable={false}
                        key="right"
                        visible={isVisible}
                        onClose={this.onClose}
                    >
                        {this.handleShowHistory()}
                    </Drawer>
                </div>
                <div className="muon__body">
                    <div className="muon__left">
                        <div className="muon__loai-tai-san">
                            <span className="muon__loai-tai-san-title">
                                Loại Tài Sản
                            </span>
                            <Select
                                style={{ width: "100%" }}
                                onChange={this.handleChange}
                                placeholder="Chọn Loại Tài Sản"
                            >
                                <Option value={"0"}>Tất cả</Option>
                                {categories.map((result, index) => {
                                    return (
                                        <Option value={result.ID} key={index}>
                                            {result.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="muon__danh-sach-tai-san">
                            <span className="muon__danh-sach-tai-san-title">
                                Danh Sách Tài Sản
                            </span>
                            <div className="muon__table">
                                <div className="muon__table-head">
                                    <div className="muon__table-column1">
                                        Tên Tài Sản
                                    </div>
                                    <div className="muon__table-column2"></div>
                                </div>
                                <div className="muon__table-body-wrapper">
                                    {facilities.map((result, index) => {
                                        return (
                                            <div
                                                className="muon__table-body"
                                                key={index}
                                            >
                                                <div className="muon__table-column1">
                                                    {result.name}
                                                </div>
                                                <div className="muon__table-column2">
                                                    <div
                                                        className="muon__table-button-plus"
                                                        onClick={() => {
                                                            this.handleClickAddFacility(
                                                                result.ID,
                                                                result.name
                                                            );
                                                        }}
                                                    >
                                                        <PlusOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="muon__right">
                        <div className="muon__input-wrapper">
                            <div className="muon__input-left">
                                <div className="muon__input">
                                    <span className="muon__input-title">
                                        Tên người mượn
                                    </span>
                                    <Input
                                        placeholder="Nhập tên người mượn"
                                        onChange={this.onChangeName}
                                        value={name}
                                    />
                                </div>
                                <div className="muon__input">
                                    <span className="muon__input-title">
                                        Số Điện Thoại
                                    </span>
                                    <Input
                                        placeholder="Nhập Số Điện Thoại"
                                        onChange={this.onChangeSDT}
                                        value={sdt}
                                    />
                                </div>
                            </div>
                            <div className="muon__input-right">
                                <div className="muon__input">
                                    <span className="muon__input-title">
                                        Số CMND
                                    </span>
                                    <Input
                                        placeholder="Nhập Số CMND"
                                        onChange={this.onChangeCMND}
                                        value={cmnd}
                                    />
                                </div>
                                <div className="muon__input">
                                    <span className="muon__input-title">
                                        Ngày Trả
                                    </span>
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        placeholder="Chọn Ngày Trả"
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="muon__danh-sach-muon">
                            <span className="muon__danh-sach-tai-san-title">
                                Danh Sách Mượn
                            </span>
                            <div className="muon__danh-sach-muon-table">
                                <div className="muon__danh-sach-muon-table-head">
                                    <div className="muon__danh-sach-muon-table-column1">
                                        STT
                                    </div>
                                    <div className="muon__danh-sach-muon-table-column2">
                                        Tên Tài Sản
                                    </div>
                                    <div className="muon__danh-sach-muon-table-column3">
                                        QRCODE
                                    </div>
                                    <div className="muon__danh-sach-muon-table-column4">
                                        Số Lượng
                                    </div>
                                    <div className="muon__danh-sach-muon-table-column5"></div>
                                </div>
                                <div className="muon__danh-sach-muon-table-body-wrapper">
                                    {orderList.map((result, index) => {
                                        return (
                                            <div className="muon__danh-sach-muon-table-body">
                                                <div className="muon__danh-sach-muon-table-column1">
                                                    {index + 1}
                                                </div>
                                                <div className="muon__danh-sach-muon-table-column2">
                                                    {result.name}
                                                </div>
                                                <div className="muon__danh-sach-muon-table-column3">
                                                    {result.ID}
                                                </div>
                                                <div className="muon__danh-sach-muon-table-column4">
                                                    {result.quantity}
                                                </div>
                                                <div className="muon__danh-sach-muon-table-column5">
                                                    <div
                                                        className="muon__danh-sach-muon-table-button-delete"
                                                        onClick={() => {
                                                            this.handleDeleteItemOrderList(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <DeleteOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="muon__button-submit">
                            <span
                                className="muon__button"
                                onClick={this.handleSubmitAdd}
                            >
                                Xác Nhận
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
