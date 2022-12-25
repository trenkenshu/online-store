import React from 'react';
import './CartItem.scss';

const CartItem = () => {
    return (
        <div className="cart__item item">
            <div className="item__number">N</div>
            <div className="item__info">
                <div className="item__img"></div>
                <div className="item__data">
                    <h3 className="item__name">NAme</h3>
                    <div className="item__description">DESCRIPTIONDESCRIPTIONDESCRIPTIONDESCRIPTIONDESCRIPTION</div>
                    <div className="item__others">
                        <div className="item__rating">5.42</div>
                        <div className="item__discount">15.27%</div>
                    </div>
                </div>
            </div>
            <div className="item__amount-block">
                <div className="item__stock">Stock: 100</div>
                <div className="item__controls">
                    <button className="item__increase">+</button>
                    <span className="item__amount">1</span>
                    <button className="item__decrease">-</button>
                </div>
                <div className="item__price"> Price: $2412</div>
            </div>
        </div>
    );
};

export default CartItem;
