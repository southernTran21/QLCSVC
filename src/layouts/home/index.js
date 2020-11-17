import React, { Component } from "react";
import { WarningFilled } from "@ant-design/icons";

export default class HomeAdmin extends Component {
    render() {
        return (
            <div className="home">
                <div className="home__top">
                    <span className="home__title">Dashboard</span>
                </div>
                <div className="home__body">
                    <div className="home__warranty">
                        <div className="home__warranty-expires">
                            <div className="home__warranty-expires__icon home__warranty-expires__icon--red">
                                <WarningFilled />
                            </div>
                            <div className="home__warranty-expires__right">
                                <span className="home__warranty-expires__title">ĐÃ HẾT HẠN BẢO HÀNH</span>
                                <span className="home__warranty-expires__quantity">1</span>
                            </div>
                        </div>
                        <div className="home__warranty-expires">
                            <div className="home__warranty-expires__icon home__warranty-expires__icon--yellow">
                                <WarningFilled />
                            </div>
                            <div className="home__warranty-expires__right">
                                <span className="home__warranty-expires__title">ĐÃ HẾT HẠN BẢO HÀNH THÁNG NÀY</span>
                                <span className="home__warranty-expires__quantity">1</span>
                            </div>
                        </div>
                        <div className="home__warranty-expires">
                            <div className="home__warranty-expires__icon home__warranty-expires__icon--blue">
                                <WarningFilled />
                            </div>
                            <div className="home__warranty-expires__right">
                                <span className="home__warranty-expires__title">ĐÃ HẾT HẠN BẢO HÀNH THÁNG TỚI</span>
                                <span className="home__warranty-expires__quantity">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
