import React, { Component } from "react";
import history from "../../history";
import { Modal, Radio, Input } from "antd";

export default class MuonCSVC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2Visible: false,
            isCheckValueRadioButton: 1,
            valueInputInf: "",
        };
    }

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    onChange = (e) => {
        console.log("radio checked", e.target.value);
        this.setState({
            isCheckValueRadioButton: e.target.value,
        });
    };

    onChangeInputInf = (e) => {
        this.setState({
            valueInputInf: e.target.value,
        });
    };

    handleSubmitModal = (isCheck, valueInput) => {
        console.log(isCheck, valueInput);
        localStorage.setItem("isCheck", isCheck);
        localStorage.setItem("valueInput", valueInput);
        history.push("/muon-csvc/muon-tai-san");
        window.location.reload();
    };

    render() {
        const { isCheckValueRadioButton, valueInputInf } = this.state;

        return (
            <div className="muon-csvc">
                
                <div className="muon-csvc__body">
                    <div
                        className="muon-csvc__button-muon"
                        onClick={() => this.setModal2Visible(true)}
                    >
                        MƯỢN
                    </div>
                    <div className="muon-csvc__button-tra">TRẢ</div>
                    <Modal
                        title="Nhập thông tin người mượn"
                        centered
                        visible={this.state.modal2Visible}
                        onOk={() =>
                            this.handleSubmitModal(
                                isCheckValueRadioButton,
                                valueInputInf
                            )
                        }
                        onCancel={() => this.setModal2Visible(false)}
                        cancelText="Huỷ"
                        okText="Xác nhận"
                    >
                        <div className="muon-csvc__modal">
                            <span className="muon-csvc__modal-title">
                                Loại thông tin muốn nhập
                            </span>
                            <Radio.Group
                                onChange={this.onChange}
                                value={isCheckValueRadioButton}
                            >
                                <Radio value={1}>Số Điện Thoại</Radio>
                                <Radio value={2}>Số CMND</Radio>
                            </Radio.Group>
                        </div>
                        <Input
                            placeholder="Nhập thông tin"
                            onChange={this.onChangeInputInf}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}
