import React from 'react';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../api/database';
import FiltersBlock from '../components/FiltersBlock/FiltersBlock';
import ProductsBlock from '../components/ProductsBlock/ProductsBlock';
import { IProduct } from '../interfaces/products';

import '../scss/Catalog.scss';

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
};

const Catalog = (props: catalogType) => {
    const { products, categories, brands, priceRange,
        stockRange, stockRangeVals, priceRangeVals, db, setCatalogStates } = props;

    // console.log('catalog', props);
    return (
        <main className="main">
            <div className="catalog">
                <FiltersBlock
                    products={products}
                    setCatalogStates={setCatalogStates}
                    categories={categories}
                    brands={brands}
                    priceRange={priceRange}
                    stockRange={stockRange}
                    priceRangeVals= {priceRangeVals}
                    stockRangeVals= {stockRangeVals}
                    db={db}
                />
                <ProductsBlock products={products} />
            </div>
        </main>
    );
};

export default Catalog;
