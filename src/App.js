import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./style/main.scss";
import "antd/dist/antd.css";
import LoginPage from "./layouts/login";
import SideBar from "./components/sidebar";
import HomeAdmin from "./layouts/home";
import Categories from "./layouts/categories";
import CategoriesAdd from "./layouts/categoriesAdd";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <LoginPage />} />
                    <Route
                        path="/admin"
                        component={() => {
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
                                            <Route
                                                path={`/admin`}
                                                exact
                                                component={HomeAdmin}
                                            />
                                            <Route
                                                path={`/admin/categories`}
                                                exact
                                                component={Categories}
                                            />
                                            <Route
                                                path={`/admin/categories-add`}
                                                exact
                                                component={CategoriesAdd}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        }}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
