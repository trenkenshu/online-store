import React from 'react';
import FiltersBlock from '../../components/FiltersBlock';
import ProductsBlock from '../../components/ProductsBlock';
import './Catalog.scss';

const Catalog = () => {
    return (
        <div className="catalog">
            <FiltersBlock />
            <ProductsBlock />
        </div>
    );
};

export default Catalog;
