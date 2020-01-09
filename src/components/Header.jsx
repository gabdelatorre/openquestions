import React from 'react';
import logo from '../assets/images/stackoverflow_logo.png';

function Header(props) {

    return (
        <div className="header">
            <div className="header-align">
                <img className="header-logo" alt="logo" src={logo}/>
            </div>
        </div>
    )
}

export default Header;