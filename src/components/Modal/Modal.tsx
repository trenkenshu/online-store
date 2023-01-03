import React, { useState } from 'react';
import BankCard from '../BankCard';
import ModalInputBlock from '../ModalInputBlock';
import './Modal.scss';

type ModalType = {
    setModal: (data: boolean) => void;
};

const Modal = (props: ModalType) => {
    // const [error, setError] = useState(false)
    const { setModal } = props;
    const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitted');
    };
    return (
        <div className="modal" onClick={() => setModal(false)}>
            <div className="modal__content" onClick={(event) => event.stopPropagation()}>
                <form className="modal__form" onSubmit={handleSumbit}>
                    <div className="modal__personal-details">
                        <h2 className="modal__title">Personal details</h2>
                        <ModalInputBlock placeholder={'Name'} />
                        <ModalInputBlock placeholder={'Phone number'} />
                        <ModalInputBlock placeholder={'Delivery address'} />
                        <ModalInputBlock placeholder={'E-mail'} />
                    </div>
                    <div className="modal__card-details">
                        <h2 className="modal__title">Credit card details</h2>
                        <BankCard />
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
