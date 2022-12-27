import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import CartClass from '../../api/cart';

type LayoutType = {
    children: React.ReactNode;
    // cart: CartClass;
    // totalItems: number;
};

const Layout = (props: LayoutType) => {
    const { children } = props;

    return (
        <>
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
