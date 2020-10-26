import React, { Component } from "react";
import imageServer from "../../image/server.svg";
import { Link } from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <div className="login">
                <div className="login__form">
                    <div className="login__left">
                        <div className="login__image-wrapper">
                            <img
                                src={imageServer}
                                alt=""
                                className="login__image"
                            />
                        </div>
                    </div>
                    <div className="login__right">
                        <span className="login__title">Đăng Nhập</span>
                        <input type="text" placeholder="Username" className="login__input"/>
                        <input type="text" placeholder="Password" className="login__input"/>
                        <div className="login__button">
                            <Link to='/admin'>Đăng Nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
