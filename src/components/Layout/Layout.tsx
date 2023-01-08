import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

type LayoutType = {
    children: React.ReactNode;
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
