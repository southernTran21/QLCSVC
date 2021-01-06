import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuonCSVC from "../layouts/muonCSVC";

export default class NhanVien extends Component {
    handleInputURL = (accountType, match) => {
        switch (accountType) {
            case "4": // quyền nhan vien
                return (
                    <Fragment>
                        <Route
                            path={`${match}`}
                            exact
                            component={MuonCSVC}
                        />
                    </Fragment>
                );
                break;
            default:
                break;
        }
    };
    render() {
        const match = this.props.match.path;
        const accountType = localStorage.getItem("accountType");
        return (
            <Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                    }}
                >
                    {this.handleInputURL(accountType, match)}
                </div>
            </Fragment>
        );
    }
}
