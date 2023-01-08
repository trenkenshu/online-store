import React from 'react';
import { IProduct } from '../../interfaces/products';
import './Button.scss';

type ButtonType = {
    name?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    inCart: boolean;
};

const Button = (props: ButtonType) => {
    const { name, onClick, inCart } = props;
    // console.log('button', props);

    return (
        <button className={inCart ? 'btn btn__drop' : 'btn btn__add'} onClick={() => onClick && onClick()}>
            {name}
        </button>
    );
};

export default Button;
