import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__logo">
                <Link className="header__logo-link" to="/">
                    <span className="yellow">Online</span> store
                </Link>
            </h1>
            <div className="header__total-price">
                <span className="header__text">Cart total : </span>
                <span className="header__sum">€0.00</span>
            </div>
            <Link to="/cart">
              <div className="header__cart">
                <div className="header__cart-amount">0</div>
              </div>
            </Link>
        </header>
    );
};

export default Header;
