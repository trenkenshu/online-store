import React from 'react';
import './ModalInputBlock.scss';

type ModalInputBlockType = {
    name: string;
    inputType: string;
    placeholder: string;
    value: string;
    inputFocus: boolean;
    inputError: boolean;
    blurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ModalInputBlock = (props: ModalInputBlockType) => {
    const { name, inputType, placeholder, value, inputFocus, inputError, blurHandler, onChangeHandler } = props;

    return (
        <div className="modal__input-block">
            <input
                className="modal__input"
                name={name}
                type={inputType}
                value={value}
                placeholder={placeholder}
                onBlur={(event) => blurHandler(event)}
                onChange={(event) => onChangeHandler(event)}
            />
            {inputFocus && inputError && <p className="modal__error">{placeholder} Error</p>}
        </div>
    );
};

export default ModalInputBlock;
