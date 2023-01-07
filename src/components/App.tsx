import React, { useEffect, useState } from 'react';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Error404 from '../pages/Page404';
import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import DBhandler, { MinmaxType, UniqueFiltersType } from '../api/database';
import CartClass, { currentProductsType } from '../api/cart';
import { IProduct } from '../interfaces/products';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from '../context';
import { addQueryFilter, removeQueryFilter, setQueryFilter } from './FiltersBlock/FiltersBlock';
import '../scss/App.scss';
import ProductPage from '../pages/ProductPage/ProductPage';
import { AddDropCartType } from './ProductCard/ProductCard';

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
    parseQueryFilters: () => rangesType;
    isOrderSumbitted: boolean;
    setIsOrderSumbitted: (data: boolean) => void;
    loadCartProductsLS: () => currentProductsType[];
    modal: boolean;
    setModal: (data: boolean) => void;
    addToCart: (args: AddDropCartType) => void;
    dropFromCart: (args: AddDropCartType) => void;
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
    const [isOrderSumbitted, setIsOrderSumbitted] = useState(false);
    const [modal, setModal] = useState(false);
    const [loaded, setLoaded] = useState(false);

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
                ans = ans === 'both' ? 'stock' : 'none';
            } else if (key === 'stock') {
                const val = {
                    min: Number(value.split('↕')[0]),
                    max: Number(value.split('↕')[1]),
                };
                db.addFilterField(key, val);
                setStockRangeVals(val);
                ans = ans === 'both' ? 'price' : 'none';
            } else {
                db.addFilterField(key, value);
            }
        }

        return ans;
    };

    const addToCart = ({ product, cart, setIncart, setTotalProducts, setTotalSum }: AddDropCartType): void => {
        cart && cart.add({ product: product as IProduct, amount: 1 });
        setIncart(true);
        cart && cart.calculateTotalSum();
        cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
        cart && setTotalSum(cart.calculateTotalSum());
        localStorage.setItem('cartCurrentProducts', JSON.stringify(cart.currentProducts));
    };
    const dropFromCart = ({ product, cart, setIncart, setTotalProducts, setTotalSum }: AddDropCartType): void => {
        console.log('dropFromCart');
        cart && cart.remove(product.id);
        setIncart(false);
        cart && cart.calculateTotalSum();
        cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
        cart && setTotalSum(cart.calculateTotalSum());
        localStorage.setItem('cartCurrentProducts', JSON.stringify(cart?.currentProducts));
    };

    const loadCartProductsLS = (): currentProductsType[] => {
        const ls = localStorage.getItem('cartCurrentProducts');
        let cartProductsFromLS: currentProductsType[] = [];
        if (typeof ls === 'string' && ls.length > 2) {
            cartProductsFromLS = JSON.parse(ls) as currentProductsType[];
        }
        return cartProductsFromLS;
    };

    const cartCurrentProductsLS = loadCartProductsLS();
    console.log('ProductBlockLS', cartCurrentProductsLS);
    cart.currentProducts = cartCurrentProductsLS.length > 0 ? cartCurrentProductsLS : cart.currentProducts;
    const [totalProducts, setTotalProducts] = useState(cart.getTotalProducts());
    const [totalSum, setTotalSum] = useState(cart.calculateTotalSum());

    useEffect(() => {
        data.then((readyArray) => {
            const whatToRange = parseQueryFilters();
            const filtered = db.runFilter();
            setPriceRange(db.minMax(readyArray, 'price'));
            setStockRange(db.minMax(readyArray, 'stock'));
            setCatalogStates(filtered, whatToRange);
            setLoaded(true);
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
        setQueryFilter: setQueryFilter,
        parseQueryFilters: parseQueryFilters,
        isOrderSumbitted: isOrderSumbitted,
        setIsOrderSumbitted: setIsOrderSumbitted,
        loadCartProductsLS: loadCartProductsLS,
        modal: modal,
        setModal: setModal,
        addToCart: addToCart,
        dropFromCart: dropFromCart,
    };

    return (
        <>
            <div className={'loader ' + (loaded ? 'loaded' : 'notLoaded')}></div>
            <StoreContext.Provider value={store}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Catalog />} />
                            <Route path="/:id" element={<ProductPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/*" element={<Error404 />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </StoreContext.Provider>
        </>
    );
};

export default App;
