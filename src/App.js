import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./style/main.scss";
import "antd/dist/antd.css";
import LoginPage from "./layouts/login";
import Admin from "./Router/admin";


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <LoginPage />} />
                    <Route
                        path="/admin"
                        component={({ match }) => <Admin match={match} />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
