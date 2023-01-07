import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context';
import BankCard from '../BankCard';
import ModalInputBlock from '../ModalInputBlock';
import './Modal.scss';

// type ModalType = {
//     setModal: (data: boolean) => void;
// };

const Modal = () => {
    const { cart, setTotalProducts, setTotalSum, setIsOrderSumbitted, setModal } = useContext(StoreContext);

    const navigate = useNavigate();
    //For personal details
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [fullNameFocus, setFullNameFocus] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [fullNameError, setFullNameError] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [phoneNumberError, setPhoneNumberError] = useState(true);
    const [addressError, setaddressError] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    //Credit Card
    const [logo, setLogo] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardNumberFocus, setCreditCardNumberFocus] = useState(false);
    const [creditCardNumberError, setCreditCardNumberError] = useState(true);
    const [creditCardValidDate, setCreditCardValidDate] = useState('');
    const [creditCardValidDateFocus, setCreditCardValidDateFocus] = useState(false);
    const [creditCardValidDateError, setCreditCardValidDateError] = useState(true);
    const [creditCardCvv, setCreditCardCvv] = useState('');
    const [creditCardCvvFocus, setCreditCardCvvFocus] = useState(false);
    const [creditCardCvvError, setCreditCardCvvError] = useState(true);

    useEffect(() => {
        if (
            fullNameError ||
            phoneNumberError ||
            addressError ||
            emailError ||
            creditCardNumberError ||
            creditCardValidDateError ||
            creditCardCvvError
        ) {
            setIsFormValid(false);
        } else {
            setIsFormValid(true);
        }
    }, [
        fullNameError,
        phoneNumberError,
        addressError,
        emailError,
        creditCardNumberError,
        creditCardValidDateError,
        creditCardCvvError,
    ]);

    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        const value = event.target.value;
        const emailRegexp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (String(value).toLowerCase().match(emailRegexp)) {
            console.log('email correct', String(value).toLowerCase().match(emailRegexp));
            setEmailError(false);
        } else {
            console.log('email incorrect', String(value).toLowerCase().match(emailRegexp));
            setEmailError(true);
        }
    };
    const fullNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
        const valueArr = event.target.value.split(' ');
        console.log(valueArr);
        if (valueArr.length >= 2 && valueArr.every((el) => el.length > 2)) {
            console.log('FullName correct');
            setFullNameError(false);
        } else {
            setFullNameError(true);
            console.log('FullName incorrect');
        }
    };

    const phoneNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
        const value = event.target.value;
        if (value[0] === '+' && value.match(/\d/g) && value.length >= 9) {
            setPhoneNumberError(false);
        } else {
            setPhoneNumberError(true);
        }
    };

    const addressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
        const valueArr = event.target.value.split(' ');
        console.log(valueArr);
        if (valueArr.length >= 3 && valueArr.every((el) => el.length > 4)) {
            console.log('address correct');
            setaddressError(false);
        } else {
            console.log('address incorrect');
            setaddressError(true);
        }
    };

    const creditNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^\d]/g, '');
        console.log('CreditCardNumber', value.split(''));
        const valueArray: string[] = [];
        const size = 4;
        if (value.length >= 0 && value.length <= 16) {
            for (let i = 0; i < value.length / size; i++) {
                valueArray.push(value.slice(i * size, i * size + size));
            }
            setCreditCardNumber(valueArray.join(' '));
        }
        //validation
        if (value.length > 16) {
            return false;
        }
        if (value.length === 16) {
            setCreditCardNumberError(false);
        } else {
            setCreditCardNumberError(true);
        }
        // console.log(valueArray.join('').length);
        //set logo
        if (value[0] === '4') {
            setLogo('visa');
        } else if (value[0] === '5') {
            setLogo('mastercard');
        } else if (value[0] === '3') {
            setLogo('americanexpress');
        } else {
            setLogo('nologo');
        }
    };

    const creditValidDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length >= 0 && value.length <= 5) {
            if (value.length === 2) {
                value = value + '/';
            }
            setCreditCardValidDate(value);
        }
        //validation
        const [month, years] = value.split('/');

        if (value.length > 5) {
            // value = value.slice(0, 5);
            return false;
        }
        if (value.match(/\d/g) && value.length === 5 && +month <= 12 && +years >= 23) {
            setCreditCardValidDateError(false);
        } else {
            setCreditCardValidDateError(true);
        }
        console.log(value.split(''));
    };
    const creditCvvHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^\d]/g, '');
        if (value.length >= 0 && value.length < 4) {
            setCreditCardCvv(value);
        }
        if (value.length > 3) return false;
        if (value.length === 3) {
            setCreditCardCvvError(false);
        } else {
            setCreditCardCvvError(true);
        }
    };

    const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'name':
                setFullNameFocus(true);
                break;
            case 'phone':
                setPhoneNumberFocus(true);
                break;
            case 'address':
                setAddressFocus(true);
                break;
            case 'email':
                setEmailFocus(true);
                break;
            case 'card-number':
                setCreditCardNumberFocus(true);
                break;
            case 'card-valid-date':
                setCreditCardValidDateFocus(true);
                break;
            case 'card-cvv':
                setCreditCardCvvFocus(true);
                break;
        }
    };

    const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitted');
        //check validations
        fullNameError === true ? setFullNameFocus(true) : setFullNameFocus(false);
        phoneNumberError === true ? setPhoneNumberFocus(true) : setPhoneNumberFocus(false);
        addressError === true ? setAddressFocus(true) : setAddressFocus(false);
        emailError === true ? setEmailFocus(true) : setEmailFocus(false);
        creditCardNumberError === true ? setCreditCardNumberFocus(true) : setCreditCardNumberFocus(false);
        creditCardValidDateError === true ? setCreditCardValidDateFocus(true) : setCreditCardValidDateFocus(false);
        creditCardCvvError === true ? setCreditCardCvvFocus(true) : setCreditCardCvvFocus(true);

        if (isFormValid) {
            setIsOrderSumbitted(true);
            cart.currentProducts = [];
            setTotalProducts(cart.getTotalProducts());
            setTotalSum(cart.calculateTotalSum());
            setTimeout(() => {
                setIsOrderSumbitted(false);
                navigate('/');
            }, 3000);
            setModal(false);
        }
    };

    return (
        <div className="modal" onClick={() => setModal(false)}>
            <div className="modal__content" onClick={(event) => event.stopPropagation()}>
                <form className="modal__form" onSubmit={handleSumbit}>
                    <div className="modal__personal-details">
                        <h2 className="modal__title">Personal details</h2>
                        <ModalInputBlock
                            placeholder={'Full name'}
                            inputType={'text'}
                            name={'name'}
                            value={fullName}
                            inputFocus={fullNameFocus}
                            inputError={fullNameError}
                            blurHandler={blurHandler}
                            onChangeHandler={fullNameHandler}
                        />
                        <ModalInputBlock
                            placeholder={'Phone number'}
                            inputType={'text'}
                            name={'phone'}
                            value={phoneNumber}
                            inputFocus={phoneNumberFocus}
                            inputError={phoneNumberError}
                            blurHandler={blurHandler}
                            onChangeHandler={phoneNumberHandler}
                        />
                        <ModalInputBlock
                            placeholder={'Delivery address'}
                            inputType={'text'}
                            name={'address'}
                            value={address}
                            inputFocus={addressFocus}
                            inputError={addressError}
                            blurHandler={blurHandler}
                            onChangeHandler={addressHandler}
                        />
                        <ModalInputBlock
                            placeholder={'E-mail'}
                            inputType={'email'}
                            name={'email'}
                            value={email}
                            inputFocus={emailFocus}
                            inputError={emailError}
                            blurHandler={blurHandler}
                            onChangeHandler={emailHandler}
                        />
                    </div>
                    <div className="modal__card-details">
                        <h2 className="modal__title">Credit card details</h2>
                        <BankCard
                            logo={logo}
                            blurHandler={blurHandler}
                            creditCardNumber={creditCardNumber}
                            creditNumberHandler={creditNumberHandler}
                            creditCardValidDate={creditCardValidDate}
                            creditValidDateHandler={creditValidDateHandler}
                            creditCardCvv={creditCardCvv}
                            creditCvvHandler={creditCvvHandler}
                        />
                        {creditCardNumberFocus && creditCardNumberError && (
                            <div className="modal__error">Card number error</div>
                        )}
                        {creditCardValidDateFocus && creditCardValidDateError && (
                            <div className="modal__error">Valid date error</div>
                        )}
                        {creditCardCvvFocus && creditCardCvvError && <div className="modal__error">CVV error</div>}
                    </div>
                    <button className="modal__btn" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
