import React from 'react';
import './PromoBlock.scss';

type PromoBlockType = {
    text: string;
    btnName: string;
    promo: boolean;
    setPromo: (data: boolean) => void;

    discount: number;
    setDiscount: (num: number) => void;
};
const PromoBlock = (props: PromoBlockType) => {
    const { text, btnName, promo, setPromo, discount, setDiscount } = props;

    const applyDiscount = () => {
        setPromo(true);
        setDiscount(discount + 10);
    };

    return (
        <div className="promo__sale-block">
            <div className="promo__sale-text">{text}</div>
            {!promo && (
                <div className="promo__add-btn" onClick={applyDiscount}>
                    {btnName}
                </div>
            )}
        </div>
    );
};
export default PromoBlock;
