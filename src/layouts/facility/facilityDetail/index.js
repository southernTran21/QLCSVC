import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "../../../history";

import { LeftCircleOutlined } from "@ant-design/icons";
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
                        facility: response.data,
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
            </div>
        );
    }
}
