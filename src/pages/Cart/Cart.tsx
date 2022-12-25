import React from 'react';
import CartHeader from '../../components/CartHeader';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import './Cart.scss';

const Cart = () => {
    return (
        <main className="main">
            <div className="cart">
                <div className="cart__list">
                    <CartHeader />
                    <CartItem />
                </div>
                <CartSummary />
            </div>
        </main>
    );
};

export default Cart;
