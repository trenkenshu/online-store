import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import CartClass from '../../api/cart';
import './Header.scss';
import { StoreContext } from '../../context';

// type HeaderType = {
//     cart: CartClass;
//     totalProducts: number;
// };
const Header = () => {
    // const { cart, totalProducts } = props;
    const { cart, totalProducts, totalSum, setTotalSum } = useContext(StoreContext);

    // useEffect(() => {
    //     setTotalSum(cart.calculateTotalSum());
    // }, [totalProducts]);
    return (
        <header className="header">
            <h1 className="header__logo">
                <Link className="header__logo-link" to="/">
                    <span className="yellow">Online</span> store
                </Link>
            </h1>
            <div className="header__total-price">
                <span className="header__text">Cart total : </span>
                <span className="header__sum">€{totalSum}</span>
            </div>
            <Link to="/cart">
                <div className="header__cart">
                    <div className="header__cart-amount">{totalProducts}</div>
                </div>
            </Link>
        </header>
    );
};

export default Header;
