import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
    DesktopOutlined,
    UserOutlined,
    FundProjectionScreenOutlined,
    IdcardOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default class SideBar extends Component {
    rootSubmenuKeys = ["sub1", "sub2", "sub4"];

    state = {
        openKeys: ["sub1"],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__information">
                    <div className="sidebar__avatar"></div>
                    <p className="sidebar__name">ADMIN</p>
                </div>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: "100%" }}
                >
                    <Menu.Item icon={<UserOutlined />}>
                        <Link to="/admin">Trang Chủ</Link>
                    </Menu.Item>
                    <SubMenu
                        icon={<FundProjectionScreenOutlined />}
                        title="Tài Sản"
                        key="sub1"
                    >
                        <Menu.Item key="1">Tất Cả Tài Sản</Menu.Item>
                        <Menu.Item key="2">Tôi Quản Lý</Menu.Item>
                        <Menu.Item key="3">Tôi Sử Dụng</Menu.Item>
                    </SubMenu>
                    <Menu.Item icon={<UserOutlined />}>
                        <Link to="/admin/categories">Loại Tài Sản</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
