import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context';
import SaleBlock from '../SaleBlock';
import './CartSummary.scss';

type CartSummaryType = {
    totalProducts: number;
};
const CartSummary = (props: CartSummaryType) => {
    const { cart } = useContext(StoreContext);
    const { totalProducts } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [promoAdd, setPromoAdd] = useState(false);

    // useEffect(() => {
    //     console.log('effect summary', searchQuery);
    //     searchPromocode();
    // }, [searchQuery]);
    console.log('searchQUERY', searchQuery);

    const applyPromocode = () => console.log('applied');

    return (
        <div className="cart__summary">
            <h2 className="cart__title">Summary</h2>
            <div className="cart__inner">
                <div className="cart__products">
                    <span className="cart__text">Products:</span>
                    <span className="cart__total">{totalProducts}</span>
                </div>
                <div className="cart__price">
                    <span className="cart__text">Total:</span>
                    <span className="cart__total">€{cart.totalSum}</span>
                </div>
                <div className="cart__promo promo">
                    <input
                        // ref={inputRef}
                        type="search"
                        className="promo__input"
                        placeholder="Enter promo code"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <div className="promo__test">Test promo : "RS',"EPM"</div>
                    {searchQuery.toLowerCase() === 'rs' && (
                        <SaleBlock text={'Rolling Scopes School - 10% '} btnName={'ADD'} onClick={applyPromocode} />
                    )}
                    {searchQuery.toLowerCase() === 'epm' && (
                        <SaleBlock text={'EPAM - 10% '} btnName={'ADD'} onClick={applyPromocode} />
                    )}
                </div>
                <button className="cart__btn">Buy Now</button>
            </div>
        </div>
    );
};

export default CartSummary;
