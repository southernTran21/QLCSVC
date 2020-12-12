import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import history from "../../history";
import {
    UserOutlined,
    FundProjectionScreenOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default class SideBar extends Component {
    rootSubmenuKeys = ["sub1", "sub2", "sub4"];

    state = {
        openKeys: ["sub"],
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
    handleDeleteLocalStorage = () => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("accountType");
        localStorage.removeItem("idAccount");
        history.push("/");
        window.location.reload();
    };

    render() {
        const displayName = localStorage.getItem("displayName");
        return (
            <div className="sidebar">
                <div className="sidebar__information">
                    <div className="sidebar__avatar"></div>
                    <p className="sidebar__name">{displayName || ""}</p>
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
                    <Menu.Item icon={<UserOutlined />}>
                        <Link to="/admin/categories">Loại Tài Sản</Link>
                    </Menu.Item>
                    <SubMenu
                        icon={<FundProjectionScreenOutlined />}
                        title="Tài Sản"
                        key="sub1"
                    >
                        <Menu.Item key="1"><Link to="/admin/taisan">Tất Cả Tài Sản</Link></Menu.Item>
                        <Menu.Item key="2">Tôi Quản Lý</Menu.Item>
                        <Menu.Item key="3">Tôi Sử Dụng</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        icon={<FundProjectionScreenOutlined />}
                        title="Quản Lý Tài Khoản"
                        key="sub2"
                    >
                        <Menu.Item key="4">
                            <Link to="/admin/account">Tài Khoản</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/admin/nhanvien">Nhân Viên</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
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
        );
    }
}
