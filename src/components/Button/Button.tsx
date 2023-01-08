import React from 'react';
import './Button.scss';

type ButtonType = {
    name?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    inCart: boolean;
};

const Button = (props: ButtonType) => {
    const { name, onClick, inCart } = props;

    return (
        <button className={inCart ? 'btn btn__drop' : 'btn btn__add'} onClick={() => onClick && onClick()}>
            {name}
        </button>
    );
};

export default Button;
