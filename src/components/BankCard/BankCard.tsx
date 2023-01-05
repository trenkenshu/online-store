import React from 'react';
import './BankCard.scss';

type BankCardType = {
    creditCardNumber: string;
    creditNumberHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const BankCard = (props: BankCardType) => {
    const { creditCardNumber, creditNumberHandler, blurHandler } = props;

    return (
        <div className="modal__card card">
            <div className="card__upper-info">
                <div className="card__logo"></div>
                <input
                    className="card__input card__input-number"
                    type="text"
                    name="card-number"
                    placeholder="Card number"
                    value={creditCardNumber}
                    // maxLength={16}
                    onBlur={(event) => blurHandler(event)}
                    onChange={(event) => creditNumberHandler(event)}
                ></input>
            </div>
            <div className="card__bottom-info">
                <div className="card__valid">
                    <div className="card__valid-text">Valid: </div>
                    <input
                        className="card__input card__input-valid"
                        type="text"
                        name="card-valid"
                        placeholder="Valid"
                    ></input>
                </div>
                <div className="card__cvv">
                    <div className="card__cvv-text">CVV: </div>
                    <input
                        className="card__input card__input-cvv"
                        type="text"
                        name="card-cvv"
                        placeholder="Code"
                    ></input>
                </div>
            </div>
        </div>
    );
};

export default BankCard;
