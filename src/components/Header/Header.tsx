import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__logo">
                <a className="header__logo-link" href="#">
                    <span className="yellow">Online</span> store
                </a>
            </h1>
            <div className="header__total-price">
                <span className="header__text">Cart total : </span>
                <span className="header__sum">€0.00</span>
            </div>
            <div className="header__cart">
                <div className="header__cart-amount">0</div>
            </div>
        </header>
    );
};

export default Header;
