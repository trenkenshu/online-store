import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItemType } from '../../interfaces/types';
import './CartItem.scss';

const CartItem = (props: CartItemType) => {
    const { product, amount, increaseAmount, decreaseAmount, currentPage, itemsPerPage } = props;
    let { index } = props;
    const navigate = useNavigate();
    index = index + itemsPerPage * (currentPage - 1);
    return (
        <div className="cart__item item">
            <div className="item__number">{index}</div>
            <div className="item__info" onClick={() => navigate(`/${product.id}`)}>
                <div className="item__img" style={{ backgroundImage: `url(${product.thumbnail.toString()})` }}></div>
                <div className="item__data">
                    <h3 className="item__name">{product.title}</h3>
                    <div className="item__description">{product.description}</div>
                    <div className="item__others">
                        <div className="item__rating">{product.rating}</div>
                        <div className="item__discount">{product.discountPercentage}%</div>
                    </div>
                </div>
            </div>
            <div className="item__amount-block">
                <div className="item__stock">Stock: {product.stock}</div>
                <div className="item__controls">
                    <button className="item__increase" onClick={() => increaseAmount(product.id)}>
                        +
                    </button>
                    <span className="item__amount">{amount}</span>
                    <button className="item__decrease" onClick={() => decreaseAmount(product.id)}>
                        -
                    </button>
                </div>
                <div className="item__price"> Price: €{product.price * amount}</div>
            </div>
        </div>
    );
};

export default CartItem;
