import React from 'react';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Error404 from '../pages/Page404';
import ProductDescription from '../pages/ProductDescription';
import { Routes, Route } from 'react-router-dom';
import '../scss/App.scss';


const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Catalog />}/>
                <Route path="/:id" element={<ProductDescription />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/notfound" element={<Error404 />}/>
            </Routes>
        </>
    );
};

export default App;
