import React from 'react';
import './BankCard.scss';

type BankCardType = {
    logo: string;
    blurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
    creditCardNumber: string;
    creditNumberHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    creditCardValidDate: string;
    creditValidDateHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    creditCardCvv: string;
    creditCvvHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const BankCard = (props: BankCardType) => {
    const {
        blurHandler,
        logo,
        creditCardNumber,
        creditNumberHandler,
        creditCardValidDate,
        creditValidDateHandler,
        creditCardCvv,
        creditCvvHandler,
    } = props;

    return (
        <div className="modal__card card">
            <div className="card__upper-info">
                <div
                    className={
                        logo === 'visa'
                            ? 'card__logo card__logo_visa'
                            : logo === 'mastercard'
                            ? 'card__logo card__logo_mastercard'
                            : logo === 'americanexpress'
                            ? 'card__logo card__logo_am-express'
                            : 'card__logo'
                    }
                ></div>
                <input
                    className="card__input card__input-number"
                    type="text"
                    name="card-number"
                    placeholder="Card number"
                    value={creditCardNumber}
                    // maxLength={20}
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
                        name="card-valid-date"
                        placeholder="Valid"
                        value={creditCardValidDate}
                        onBlur={(event) => blurHandler(event)}
                        onChange={(event) => creditValidDateHandler(event)}
                        // maxLength={5}
                    ></input>
                </div>
                <div className="card__cvv">
                    <div className="card__cvv-text">CVV: </div>
                    <input
                        className="card__input card__input-cvv"
                        type="text"
                        name="card-cvv"
                        placeholder="Code"
                        value={creditCardCvv}
                        onBlur={(event) => blurHandler(event)}
                        onChange={(event) => creditCvvHandler(event)}
                    ></input>
                </div>
            </div>
        </div>
    );
};

export default BankCard;
