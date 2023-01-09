import React from 'react';
import './Page404.scss';

const Error404 = () => {
    return (
        <div className="error">
            <p className="error__number">404</p>
            <p className="error__text">Oops...It's seems you are lost!</p>
        </div>
    );
};

export default Error404;
