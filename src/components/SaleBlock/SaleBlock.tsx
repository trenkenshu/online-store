import React from 'react';
import './SaleBlock.scss';

type PromoBlockType = {
    text: string;
    btnName: string;
    onClick: () => void;
};
const SaleBlock = (props: PromoBlockType) => {
    const { text, btnName, onClick } = props;

    return (
        <div className="promo__sale-block">
            <div className="promo__sale-text">{text}</div>
            <div className="promo__add-btn" onClick={onClick}>
                {btnName}
            </div>
        </div>
    );
};
export default SaleBlock;
