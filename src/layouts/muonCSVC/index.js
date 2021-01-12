import React, { Component } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import history from "../../history";

export default class MuonCSVC extends Component {
    handleDeleteLocalStorage = () => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("accountType");
        localStorage.removeItem("idAccount");
        history.push("/");
        window.location.reload();
    };
    render() {
        return (
            <div className="muon-csvc">
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
            </div>
        );
    }
}
