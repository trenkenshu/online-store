import React from 'react';
import './CartHeader.scss';

const CartHeader = () => {
    return (
        <div className="cart__list-options">
            <h2 className="cart__header">Cart List Name</h2>
            <div className="cart__control">
                <div className="cart__items">
                    Items:
                    <input type="text" className="cart__limit-input" defaultValue={1} />
                </div>
                <div className="cart__pages">
                    Page:
                    <button className="cart__pages-btn">&#129120;</button>
                    <span className="cart__pages-number">1</span>
                    <button className="cart__pages-btn">&#129122;</button>
                </div>
            </div>
        </div>
    );
};

export default CartHeader;
