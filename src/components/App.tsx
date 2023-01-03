/* eslint-disable prettier/prettier */
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
import { addQueryFilter, removeQueryFilter, setQueryFilter } from './FiltersBlock/FiltersBlock';
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
    totalProducts: number;
    setTotalProducts: (number: number) => void;
    totalSum: number;
    setTotalSum: (number: number) => void;
    setCatalogStates: (data: IProduct[], withRanges: rangesType) => void;
    addQueryFilter: (name: string, value: string) => void;
    setQueryFilter: (name: string, value: MinmaxType | string) => void;
    removeQueryFilter: (name: string, value: string) => void;

}

type rangesType = 'both' | 'stock' | 'price' | 'none';

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
    const [totalProducts, setTotalProducts] = useState(cart.getTotalProducts());
    const [totalSum, setTotalSum] = useState(cart.calculateTotalSum());

    const setCatalogStates = (data: IProduct[], withRanges: rangesType): void => {
        setProducts(data);
        setCategories(db.uniqueFilterFields(data, 'category'));
        setBrands(db.uniqueFilterFields(data, 'brand'));

        switch (withRanges) {
            case 'price':
                let minmax: MinmaxType = db.minMax(data, 'price');
                setPriceRangeVals(minmax);
                break;
            case 'stock':
                minmax = db.minMax(data, 'stock');
                setStockRangeVals(db.minMax(data, 'stock'));
                break;
            case 'both':
                setPriceRangeVals(db.minMax(data, 'price'));
                setStockRangeVals(db.minMax(data, 'stock'));
                break;
            case 'none':

                break;
        }
    };

    const parseQueryFilters = (): rangesType => {
        let ans: rangesType = 'both';
        const url = new URL(window.location.href);
        for (const [key, value] of url.searchParams.entries()) {
            if (key === 'price') {
                const val = {
                    min: Number(value.split('↕')[0]),
                    max: Number(value.split('↕')[1]),
                };
                db.addFilterField(key, val);
                setPriceRangeVals(val);
                ans = ans === 'both'
                    ? 'stock'
                    : 'none';

            } else if (key === 'stock') {
                const val = {
                    min: Number(value.split('↕')[0]),
                    max: Number(value.split('↕')[1]),
                };
                db.addFilterField(key, val);
                setStockRangeVals(val);
                ans = ans === 'both'
                    ? 'price'
                    : 'none';

            } else {
                db.addFilterField(key, value);
            }
        };

        return ans;
    }


    useEffect(() => {
        data.then((readyArray) => {
            const whatToRange = parseQueryFilters();
            const filtered = db.runFilter();
            setPriceRange(db.minMax(readyArray, 'price'));
            setStockRange(db.minMax(readyArray, 'stock'));
            setCatalogStates(filtered, whatToRange);
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
        totalProducts: totalProducts,
        setTotalProducts: setTotalProducts,
        totalSum: totalSum,
        setTotalSum: setTotalSum,
        setCatalogStates: setCatalogStates,
        addQueryFilter: addQueryFilter,
        removeQueryFilter: removeQueryFilter,
        setQueryFilter: setQueryFilter
    };

    return (
        <>
            <StoreContext.Provider value={store}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Catalog />} />
                            <Route path="/:id" element={<ProductDescription />} />
                            <Route
                                path="/cart"
                                element={
                                    cart.currentProducts.length === 0 ? (
                                        <div className="cart__empty">Cart is empty ☹️</div>
                                    ) : (
                                        <Cart />
                                    )
                                }
                            />
                            <Route path="/*" element={<Error404 />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </StoreContext.Provider>
        </>
    );
};

export default App;
