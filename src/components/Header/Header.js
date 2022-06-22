import React from "react";
import logo from "../../images/logo.svg"

const Header = () => {
    return (
        <div className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип сайта"
            />
        </div>
    )
};
export default Header