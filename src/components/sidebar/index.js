import React, { Component } from "react";
import { Menu } from "antd";
import {
    MailOutlined, DesktopOutlined, UserOutlined, FundProjectionScreenOutlined, IdcardOutlined,
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
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256 }}
                >
                    <Menu.Item icon={<DesktopOutlined />} key="sub1">Quản trị tài sản</Menu.Item>
                    <Menu.Item icon={<UserOutlined />}>Quản trị người dùng</Menu.Item>
                    <Menu.Item icon={<IdcardOutlined />}>Quản trị hệ thống</Menu.Item>
                    <SubMenu
                        icon={<FundProjectionScreenOutlined />}
                        title="Báo cáo thống kê"
                    >
                        <Menu.Item key="1">Option 1</Menu.Item>
                    </SubMenu>
                    
                </Menu>
            </div>
        );
    }
}
