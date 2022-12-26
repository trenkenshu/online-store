import React from 'react';
import './CartSummary.scss';

const CartSummary = () => {
    return (
        <div className="cart__summary">
            <h2 className="cart__title">Summary</h2>
            <div className="cart__inner">
                <div className="cart__products">
                    <span className="cart__text">Products:</span>
                    <span className="cart__total">11</span>
                </div>
                <div className="cart__price">
                    <span className="cart__text">Total:</span>
                    <span className="cart__total">$1241</span>
                </div>
                <div className="cart__promo">
                    <input type="search" className="cart__promo-input" placeholder="Enter promo code" />
                </div>
                <button className="cart__btn">Buy Now</button>
            </div>
        </div>
    );
};

export default CartSummary;
