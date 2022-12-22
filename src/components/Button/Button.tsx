import React from 'react';
import './Button.scss';

type ButtonType = {
    name?: string;
    children?: React.ReactNode;
    onClick?: Function;
};

const Button = (props: ButtonType) => {
    const { name } = props;

    return <button className="btn">{name}</button>;
};

export default Button;
