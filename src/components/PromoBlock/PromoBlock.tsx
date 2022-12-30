import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import './PromoBlock.scss';

type PromoBlockType = {
    text: string;
    btnName: string;
    // onClick: () => void;
    promoAdd: boolean;
    setPromoAdd: (data: boolean) => void;
};
const PromoBlock = (props: PromoBlockType) => {
    const { cart } = useContext(StoreContext);
    const { text, btnName, promoAdd, setPromoAdd } = props;

    const applyDiscount = () => {
        console.log('applied', addDiscountToTotalSum(10));
        cart.totalSum = addDiscountToTotalSum(10);
        setPromoAdd(true);
    };
    const addDiscountToTotalSum = (num: number) => {
        const newSum = cart.totalSum - (cart.totalSum * num) / 100;
        return newSum;
    };

    return (
        <div className="promo__sale-block">
            <div className="promo__sale-text">{text}</div>
            {!promoAdd && (
                <div className="promo__add-btn" onClick={applyDiscount}>
                    {btnName}
                </div>
            )}
        </div>
    );
};
export default PromoBlock;
