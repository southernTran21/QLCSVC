import React, { Component } from "react";
import axios from "axios";
import {
    PlusOutlined,
    DeleteOutlined,
    RetweetOutlined,
} from "@ant-design/icons";

import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchedColumn: "",
            categories: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/categories")
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };
    render() {
        const columns = [
            {
                title: "ID",
                dataIndex: "ID",
                key: "ID",
                width: '10%',
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                ...this.getColumnSearchProps("name"),
                render: (text) => <a>{text}</a>,
                width: '40%',
            },
            {
                title: "Desc",
                dataIndex: "description",
                key: "description",
                width: '30%',
            },
            {
                title: "Action",
                dataIndex: "",
                key: "x",
                render: () => <a>Delete</a>,
                width: '20%',
            },
        ];

        const data = this.state.categories
        console.log(this.state.categories)
        return (
            <div className="categories">
                <div className="categories__top">
                    <span className="categories__title">Loại Tài Sản</span>
                    <div className="categories__right">
                        <div className="categories__button">
                            <RetweetOutlined />
                            <span className="categories__button__text">
                                Tải Lại
                            </span>
                        </div>
                        <div className="categories__button">
                            <PlusOutlined />
                            <span className="categories__button__text">
                                Thêm mới
                            </span>
                        </div>
                        <div className="categories__button">
                            <DeleteOutlined />
                            <span className="categories__button__text">
                                Xoá
                            </span>
                        </div>
                    </div>
                </div>
                <div className="categories__table">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}

export default Categories;
