import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context';
import PromoBlock from '../PromoBlock';
import './CartSummary.scss';

type CartSummaryType = {
    totalProducts: number;
};
const CartSummary = (props: CartSummaryType) => {
    const { cart } = useContext(StoreContext);
    const { totalProducts } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [promoAdd, setPromoAdd] = useState(false);
    const [rsPromo, setRsPromo] = useState(false);
    const [epamPromo, setEpamPromo] = useState(false);

    // useEffect(() => {
    //     console.log('effect summary', searchQuery);
    // }, [searchQuery]);
    // console.log('searchQUERY', searchQuery);
    //TODO!!! изменение тоталсуммы после скидок
    return (
        <div className="cart__summary">
            <h2 className="cart__title">Summary</h2>
            <div className="cart__inner">
                <div className="cart__products">
                    <div className="cart__text">Products:</div>
                    <div className="cart__total">{totalProducts}</div>
                </div>
                <div className="cart__price">
                    <div className="cart__text">Total:</div>
                    <div className="cart__total">€{cart.totalSum}</div>
                </div>
                {(rsPromo || epamPromo) && (
                    <div className="cart__price">
                        <div className="cart__text">Total:</div>
                        <div className="cart__total">€{cart.totalSum}</div>
                    </div>
                )}
                {rsPromo && (
                    <div className="cart__discount_aplied">
                        <div className="cart__discount-text">Rolling Scopes School - 10%</div>
                        <div className="cart__discount-btn" onClick={() => setRsPromo(false)}>
                            DROP
                        </div>
                    </div>
                )}
                {epamPromo && (
                    <div className="cart__discount_aplied">
                        <div className="cart__discount-text">EPAM - 10%</div>
                        <div className="cart__discount-btn" onClick={() => setEpamPromo(false)}>
                            DROP
                        </div>
                    </div>
                )}
                <div className="cart__promo promo">
                    <input
                        type="search"
                        className="promo__input"
                        placeholder="Enter promo code"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <div className="promo__test">Test promo : "RS',"EPM"</div>
                    {searchQuery.toLowerCase() === 'rs' && (
                        <PromoBlock
                            text={'Rolling Scopes School - 10% '}
                            btnName={'ADD'}
                            promoAdd={rsPromo}
                            setPromoAdd={setRsPromo}
                        />
                    )}
                    {searchQuery.toLowerCase() === 'epm' && (
                        <PromoBlock
                            text={'EPAM - 10% '}
                            btnName={'ADD'}
                            promoAdd={epamPromo}
                            setPromoAdd={setEpamPromo}
                        />
                    )}
                </div>
                <button className="cart__btn">Buy Now</button>
            </div>
        </div>
    );
};

export default CartSummary;
