import React from 'react';
import Layout from '../../components/Layout';
import './Page404.scss';

const Error404 = () => {
    return (
        <Layout>
            <main className="main">
                <div className="error">
                    <p className="error__number">404</p>
                    <p className="error__text">Oops...It's seems you are lost!</p>
                </div>
            </main>
        </Layout>
    );
};

export default Error404;
