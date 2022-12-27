import React from 'react';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../../api/database';
import FiltersBlock from '../../components/FiltersBlock';
import ProductsBlock from '../../components/ProductsBlock';
import { IProduct } from '../../interfaces/products';
import './Catalog.scss';
import CartClass from '../../api/cart';

export type catalogType = {
    products: IProduct[];
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
    categories: UniqueFiltersType;
    brands: UniqueFiltersType;
    priceRange: MinmaxType;
    stockRange: MinmaxType;
    priceRangeVals: MinmaxType;
    stockRangeVals: MinmaxType;
    db: DBhandler;
    cart?: CartClass;
    setTotalItems?: (number: number) => void;
};

const Catalog = () => {
    return (
        <main className="main">
            <div className="catalog">
                <FiltersBlock />
                <ProductsBlock />
            </div>
        </main>
    );
};

export default Catalog;
