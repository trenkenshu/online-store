import React from 'react';
import './BankCard.scss';

const BankCard = () => {
    return (
        <div className="modal__card card">
            <div className="card__upper-info">
                <div className="card__logo"></div>
                <input className="card__input card__input-number" type="number" placeholder="Card number"></input>
            </div>
            <div className="card__bottom-info">
                <div className="card__valid">
                    <div className="card__valid-text">Valid: </div>
                    <input className="card__input card__input-valid" type="number" placeholder="Valid"></input>
                </div>
                <div className="card__cvv">
                    <div className="card__cvv-text">CVV: </div>
                    <input className="card__input card__input-cvv" type="number" placeholder="Code"></input>
                </div>
            </div>
        </div>
    );
};

export default BankCard;
