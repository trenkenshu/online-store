import React, { useEffect, useState } from 'react';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../../api/database';
import FiltersBlock from '../../components/FiltersBlock';
import ProductsBlock from '../../components/ProductsBlock';
import { IProduct } from '../../interfaces/products';
import Layout from '../../components/Layout';
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

const db = new DBhandler();
const data: Promise<IProduct[]> = db.load(new URL('https://dummyjson.com/products?limit=100'));
const cart = new CartClass();

const Catalog = () => {
    const [catData, setCatData] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<UniqueFiltersType>([]);
    const [brands, setBrands] = useState<UniqueFiltersType>([]);
    const [priceRange, setPriceRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRange, setStockRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [priceRangeVals, setPriceRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRangeVals, setStockRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [totalItems, setTotalItems] = useState(cart.getTotalItems());

    const setCatalogStates = (data: IProduct[], withRanges: 'both' | 'stock' | 'price'): void => {
        console.log(db.uniqueFilterFields(data, 'category'));
        setCatData(data);
        setCategories(db.uniqueFilterFields(data, 'category'));
        setBrands(db.uniqueFilterFields(data, 'brand'));
        switch (withRanges) {
            case 'price':
                setPriceRangeVals(db.minMax(data, 'price'));
                break;
            case 'stock':
                setStockRangeVals(db.minMax(data, 'stock'));
                break;
            case 'both':
                setPriceRangeVals(db.minMax(data, 'price'));
                setStockRangeVals(db.minMax(data, 'stock'));
                break;
        }
    };
    useEffect(() => {
        data.then((readyArray) => {
            setPriceRange(db.minMax(readyArray, 'price'));
            setStockRange(db.minMax(readyArray, 'stock'));
            setCatalogStates(readyArray, 'both');
        }).catch((error: Error) => console.log(error.message));
    }, []);

    // console.log('catalog', props);
    return (
        <Layout>
            <main className="main">
                <div className="catalog">
                    <FiltersBlock
                        products={catData}
                        setCatalogStates={setCatalogStates}
                        categories={categories}
                        brands={brands}
                        priceRange={priceRange}
                        stockRange={stockRange}
                        priceRangeVals={priceRangeVals}
                        stockRangeVals={stockRangeVals}
                        db={db}
                    />
                    <ProductsBlock products={catData} cart={cart} setTotalItems={setTotalItems} />
                </div>
            </main>
        </Layout>
    );
};

export default Catalog;
