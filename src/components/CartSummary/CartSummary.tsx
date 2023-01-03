import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context';
import PromoBlock from '../PromoBlock';
import './CartSummary.scss';

type CartSummaryType = {
    setModal: (data: boolean) => void;
};
const CartSummary = (props: CartSummaryType) => {
    const { cart, totalSum, totalProducts } = useContext(StoreContext);
    const { setModal } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [rsPromo, setRsPromo] = useState(false);
    const [epamPromo, setEpamPromo] = useState(false);
    const [discount, setDiscount] = useState(0);

    const getDiscount = () => (100 - discount) / 100;

    const cancelDiscount = (setPromo: (data: boolean) => void) => {
        setPromo(false);
        setDiscount(discount - 10);
    };
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
                    <div className={rsPromo || epamPromo ? 'cart__total cart__total_old' : 'cart__total'}>
                        €{totalSum.toFixed(2)}
                    </div>
                </div>
                {(rsPromo || epamPromo) && (
                    <div className="cart__price">
                        <div className="cart__text">Total:</div>
                        <div className="cart__total">€{(totalSum * getDiscount()).toFixed(2)}</div>
                    </div>
                )}
                {rsPromo && (
                    <div className="cart__discount_aplied">
                        <div className="cart__discount-text">Rolling Scopes School - 10%</div>
                        <div className="cart__discount-btn" onClick={() => cancelDiscount(setRsPromo)}>
                            DROP
                        </div>
                    </div>
                )}
                {epamPromo && (
                    <div className="cart__discount_aplied">
                        <div className="cart__discount-text">EPAM - 10%</div>
                        <div className="cart__discount-btn" onClick={() => cancelDiscount(setEpamPromo)}>
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
                            promo={rsPromo}
                            setPromo={setRsPromo}
                            discount={discount}
                            setDiscount={setDiscount}
                        />
                    )}
                    {searchQuery.toLowerCase() === 'epm' && (
                        <PromoBlock
                            text={'EPAM - 10% '}
                            btnName={'ADD'}
                            promo={epamPromo}
                            setPromo={setEpamPromo}
                            discount={discount}
                            setDiscount={setDiscount}
                        />
                    )}
                </div>
                <button className="cart__btn" onClick={() => setModal(true)}>
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default CartSummary;
