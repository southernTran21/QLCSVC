import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "../history";
import MuonCSVC from "../layouts/muonCSVC";
import MuonTaiSan from "../layouts/muonCSVC/muonTaiSan";
import { LogoutOutlined } from "@ant-design/icons";

export default class NhanVien extends Component {
    handleInputURL = (accountType, match) => {
        switch (accountType) {
            case "4": // quyền nhan vien
                return (
                    <Fragment>
                        <Route path={`${match}`} exact component={MuonCSVC} />
                        <Route
                            path={`${match}/muon-tai-san`}
                            exact
                            component={MuonTaiSan}
                        />
                    </Fragment>
                );
                break;
            default:
                break;
        }
    };

    handleDeleteLocalStorage = () => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("accountType");
        localStorage.removeItem("idAccount");
        history.push("/");
        window.location.reload();
    };

    render() {
        const match = this.props.match.path;
        const accountType = localStorage.getItem("accountType");
        return (
            <Fragment>
                <div className="muon-csvc__navbar">
                    <div className="muon-csvc__title">
                        <span>Facility Management</span>
                    </div>
                    <div
                        className="sidebar__button-logout"
                        onClick={() => {
                            this.handleDeleteLocalStorage();
                        }}
                    >
                        <span>LOGOUT</span>
                        <LogoutOutlined />
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    {this.handleInputURL(accountType, match)}
                </div>
            </Fragment>
        );
    }
}
