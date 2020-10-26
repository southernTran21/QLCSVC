import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
                <div className="navbar__left">
                    <span>Tên hệ thống</span>
                </div>
                <div className="navbar__right">
                    <span>Tên người dùng</span>
                </div>
            </div>
        )
    }
}
