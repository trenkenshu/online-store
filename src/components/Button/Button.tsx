import React from 'react';
import './Button.scss';

type ButtonType = {
    name?: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

const Button = (props: ButtonType) => {
    const { name, onClick } = props;
    // console.log('button', props);

    return (
        <button className="btn" onClick={() => onClick && onClick()}>
            {name}
        </button>
    );
};

export default Button;
