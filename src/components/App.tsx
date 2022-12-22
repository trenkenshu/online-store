import React, { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import Header from './Header';
import Catalog from '../pages/Сatalog';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../api/database';
import { IProduct } from '../interfaces/products';
import '../scss/App.scss';

const db = new DBhandler();
const data: Promise<IProduct[]> = db.load(new URL('https://dummyjson.com/products?limit=100'));

const App = () => {
    const [catData, setCatData] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<UniqueFiltersType>([]);
    const [brands, setBrands] = useState<UniqueFiltersType>([]);
    const [priceRange, setPriceRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRange, setStockRange] = useState<MinmaxType>({ min: 0, max: Infinity });

    const setCatalogStates = (data: IProduct[]) => {
        setCatData(data);
        setCategories(db.uniqueFilterFields('category'));
        setBrands(db.uniqueFilterFields('brand'));
        setPriceRange(db.minMax(data, 'price'));
        setStockRange(db.minMax(data, 'stock'));
    };
    useEffect(() => {
        data.then((readyArray) => {
            setCatalogStates(readyArray);
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
                db={db}
            />
            <Footer />
        </>
    );
};

export default App;
