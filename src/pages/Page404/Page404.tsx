import React from 'react';
import '../scss/Page404.scss';

const Error404 = () => {
    return (
        <main className="main">
            <div className="error">
                <p className="error__number">404</p>
                <p className="error__text">Oops...It's seems you are lost!</p>
            </div>
        </main>
    );
};

export default Error404;
