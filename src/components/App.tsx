import React, { useEffect, useState } from 'react';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Error404 from '../pages/Page404';
import ProductDescription from '../pages/ProductDescription';
import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../api/database';
import CartClass from '../api/cart';
import { IProduct } from '../interfaces/products';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from '../context';
import '../scss/App.scss';

export interface StoreType {
    database: DBhandler;
    cart: CartClass;
    products: IProduct[];
    categories: UniqueFiltersType;
    brands: UniqueFiltersType;
    priceRange: MinmaxType;
    stockRange: MinmaxType;
    priceRangeVals: MinmaxType;
    stockRangeVals: MinmaxType;
    totalItems: number;
    setTotalItems: (number: number) => void;
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
}

const db = new DBhandler();
const data: Promise<IProduct[]> = db.load(new URL('https://dummyjson.com/products?limit=100'));
const cart = new CartClass();

const App = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<UniqueFiltersType>([]);
    const [brands, setBrands] = useState<UniqueFiltersType>([]);
    const [priceRange, setPriceRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRange, setStockRange] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [priceRangeVals, setPriceRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [stockRangeVals, setStockRangeVals] = useState<MinmaxType>({ min: 0, max: Infinity });
    const [totalItems, setTotalItems] = useState(cart.getTotalItems());

    const setCatalogStates = (data: IProduct[], withRanges: 'both' | 'stock' | 'price'): void => {
        console.log(db.uniqueFilterFields(data, 'category'));
        setProducts(data);
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

    const store: StoreType = {
        database: db,
        cart: cart,
        products: products,
        categories: categories,
        brands: brands,
        priceRange: priceRange,
        stockRange: stockRange,
        priceRangeVals: priceRangeVals,
        stockRangeVals: stockRangeVals,
        totalItems: totalItems,
        setTotalItems: setTotalItems,
        setCatalogStates: setCatalogStates,
    };

    return (
        <>
            <StoreContext.Provider value={store}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Catalog />} />
                            <Route path="/:id" element={<ProductDescription />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/notfound" element={<Error404 />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </StoreContext.Provider>
        </>
    );
};

export default App;
