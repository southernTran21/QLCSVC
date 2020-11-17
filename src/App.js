import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./style/main.scss";
import "antd/dist/antd.css";
import LoginPage from "./layouts/login";
import SideBar from "./components/sidebar";
import HomeAdmin from "./layouts/home";

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
                                        <div style={{ width: "83%" }}>
                                            <Route
                                                path={`/admin`}
                                                exact
                                                component={HomeAdmin}
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
