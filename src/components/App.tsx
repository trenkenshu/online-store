import React, { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import Header from './Header';
import Catalog from '../pages/Catalog';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../api/database';
import { IProduct } from '../interfaces/products';
import '../scss/App.scss';
import Cart from '../pages/Cart';

const db = new DBhandler();
const data: Promise<IProduct[]> = db.load(new URL('https://dummyjson.com/products?limit=100'));

const App = () => {
    const [catData, setCatData] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<UniqueFiltersType>([]);
    const [brands, setBrands] = useState<UniqueFiltersType>([]);
    const [priceRange, setPriceRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRange, setStockRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [priceRangeVals, setPriceRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRangeVals, setStockRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });

    const setCatalogStates = (data: IProduct[], withRanges: 'both' | 'stock' | 'price'): void => {
        console.log(db.uniqueFilterFields(data, 'category'));
        setCatData(data);
        setCategories(db.uniqueFilterFields(data, 'category'));
        setBrands(db.uniqueFilterFields(data, 'brand'));
            switch(withRanges) {
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

    return (
        <>
            <Header />
            <Catalog
                products={catData}
                setCatalogStates={setCatalogStates}
                categories={categories}
                brands={brands}
                priceRange={priceRange}
                stockRange={stockRange}
                priceRangeVals = {priceRangeVals}
                stockRangeVals = {stockRangeVals}
                db={db}
            />
            <Footer />
        </>
    );
};

export default App;
