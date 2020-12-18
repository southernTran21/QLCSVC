import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "../components/sidebar";
import HomeAdmin from "../layouts/home";
import Categories from "../layouts/categories";
import CategoriesAdd from "../layouts/categories/categoriesAdd";
import Account from "../layouts/account";
import AccountAdd from "../layouts/account/accountAdd";
import NhanVien from "../layouts/nhanVien";
import NhanVienAdd from "../layouts/nhanVien/nhanVienAdd";
import Facility from "../layouts/facility";
import FacilityAdd from "../layouts/facility/facilityAdd";
import AccountEdit from "../layouts/account/accountEdit";

export default class Admin extends Component {
    handleInputURL = (accountType, match) => {
        switch (accountType) {
            case '1', '3': // quyền admin
                return (
                    <Fragment>
                        <Route path={`${match}`} exact component={HomeAdmin} />
                        <Route
                            path={`${match}/categories`}
                            exact
                            component={Categories}
                        />
                        <Route
                            path={`${match}/categories-add`}
                            exact
                            component={CategoriesAdd}
                        />
                        <Route
                            path={`${match}/account`}
                            exact
                            component={Account}
                        />
                        <Route
                            path={`${match}/account-add`}
                            exact
                            component={AccountAdd}
                        />
                        <Route
                            path={`${match}/account-edit`}
                            exact
                            component={AccountEdit}
                        />
                        <Route
                            path={`${match}/nhanvien`}
                            exact
                            component={NhanVien}
                        />
                        <Route
                            path={`${match}/nhanvien-add`}
                            exact
                            component={NhanVienAdd}
                        />
                        <Route
                            path={`${match}/taisan`}
                            exact
                            component={Facility}
                        />
                        <Route
                            path={`${match}/taisan-add`}
                            exact
                            component={FacilityAdd}
                        />
                    </Fragment>
                );
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
                    <div style={{ width: "17%" }}>
                        <SideBar />
                    </div>
                    <div
                        style={{
                            width: "83%",
                            backgroundColor: "#f0f0f0",
                        }}
                    >
                        {this.handleInputURL(accountType, match)}
                    </div>
                </div>
            </Fragment>
        );
    }
}
