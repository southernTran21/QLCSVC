import React, { Component } from "react";
import history from "../../../history";
import axios from "axios";
import { message } from "antd";
import { SheetJSFT } from "./type";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { NavLink, Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

export default class FacilityAddExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
    }

    handleFile() {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type: rABS ? "binary" : "array",
                bookVBA: true,
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            this.setState(
                { data: data, cols: make_cols(ws["!ref"]) },
                () => {}
            );
        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        }
    }

    onSubmit = () => {
        const { data } = this.state;
        console.log(data);
        if (data.length > 0 && data != null && data != undefined) {
            data.map((result, index) => {
                axios
                .post("http://localhost:3001/facility/add", {
                    name: result["Tên Tài Sản"],
                    ngayMua: result["Ngày Mua (yyyy-mm-dd)"],
                    hanSuDung: result["Hạn Sử Dụng (Tháng)"],
                    giaTien: result["Giá  Tiền (VND)"],
                    moTa: result["Mô Tả"],
                })
            });
        }
        message.success("Đã Lưu");
    };

    showResultImport = (data) => {
        if (data != null && data != undefined) {
            return (
                <div className="result">
                    <div className="result__list">
                        <div className="result__title">
                            <div className="result__column1"></div>
                            <div className="result__column2">Tên Tài Sản</div>
                            <div className="result__column3">Ngày Mua</div>
                            <div className="result__column4">Hạn Sử Dụng</div>
                            <div className="result__column5">Giá Tiền</div>
                            <div className="result__column6">Mô Tả</div>
                        </div>
                        <div className="result__content__wrapper">
                            {data.map((result, index) => {
                                return (
                                    <div
                                        className="result__content"
                                        key={index}
                                    >
                                        <div className="result__column1">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="result__column2">
                                            <span>{result["Tên Tài Sản"]}</span>
                                        </div>
                                        <div className="result__column3">
                                            <span>
                                                {
                                                    result[
                                                        "Ngày Mua (yyyy-mm-dd)"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                        <div className="result__column4">
                                            <span>
                                                {result["Hạn Sử Dụng (Tháng)"]}
                                            </span>
                                        </div>
                                        <div className="result__column5">
                                            <span>
                                                {Number(
                                                    result["Giá  Tiền (VND)"]
                                                ).toLocaleString("el-GR")}
                                            </span>
                                        </div>
                                        <div className="result__column6">
                                            <span>{result["Mô Tả"]}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className="result__button__Wrapper"
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        <span className="result__button">Submit</span>
                    </div>
                </div>
            );
        }
    };

    render() {
        const { data, file } = this.state;
        const name = "Tên Tài Sản";
        console.log(data);
        return (
            <div className="facility-add-excel">
                <div className="facility-add-excel__input">
                    <div>
                        <label className="facility-add-excel__title">
                            Thêm Tài Sản Bằng File Excel
                        </label>
                        <br />
                        <input
                            type="file"
                            className="facility-add-excel__input-file-excel"
                            id="file"
                            accept={SheetJSFT}
                            onChange={this.handleChange}
                        />
                        <br />
                        <input
                            className="facility-add-excel__button-submit"
                            type="submit"
                            value="Xác Nhận"
                            onClick={this.handleFile}
                        />
                    </div>
                    <div className="facility-add-excel__button-close">
                        <Link
                            to="/admin/taisan"
                            className="categories-add__icon"
                        >
                            <CloseOutlined />
                        </Link>
                    </div>
                </div>
                {this.showResultImport(data)}
            </div>
        );
    }
}
