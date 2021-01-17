import React, { Component } from "react";

export default class MuonTaiSan extends Component {
    constructor(props) {
        super(props);
        const isCheck = localStorage.getItem("isCheck");
        const valueInput = localStorage.getItem("valueInput");
        // if (isCheck != null && valueInput != null) {
        //     this.setState({
        //         isCheck:
        //     });
        // }
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="muon">
                <div className="muon__navbar"></div>
                <div className="muon__body">
                    <div className="muon__left">
                        <div className="muon__loai-tai-san"></div>
                        <div className="muon__danh-sach-tai-san"></div>
                    </div>
                    <div className="muon__right">
                        <div className="muon__input"></div>
                        <div className="muon__danh-sach-muon"></div>
                    </div>
                </div>
            </div>
        );
    }
}
