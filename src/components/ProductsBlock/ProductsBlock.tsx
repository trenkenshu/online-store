import React, { useContext, useState, useEffect } from 'react';
import './ProductsBlock.scss';
import ProductCard from '../ProductCard';
import { StoreContext } from '../../context';

const ProductsBlock = () => {
    const { products, cart, setTotalProducts, setCatalogStates, setQueryFilter, database, loadCartProductsLS } =
        useContext(StoreContext);
    const [view, setView] = useState('grid');
    const [selected, setSelected] = useState(database.sort);
    const productItemsClasses = ['products__items'];
    // const changeView = (newView: string) => {
    //     setView(newView);
    // };
    // const cartCurrentProductsLS = loadCartProductsLS();
    // console.log('ProductBlockLS', cartCurrentProductsLS);
    // cart.currentProducts = cartCurrentProductsLS.length > 0 ? cartCurrentProductsLS : cart.currentProducts;
    if (view === 'list') {
        productItemsClasses.push('products__items_list');
    }
    const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        database.addFilterField('search', event.target.value);
        setQueryFilter('search', event.target.value);
        const filtered = database.runFilter();
        setCatalogStates(filtered, 'both');
    };

    const onSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        database.addFilterField('sort', event.target.value);
        setQueryFilter('sort', String(event.target.value));
        setSelected(event.target.value);
        setCatalogStates(database.runFilter(), 'none');
    };

    const onChangeView = (event: React.MouseEvent<HTMLElement>) => {
        const el = event.target as HTMLElement;
        if (el.id) {
            setView(el.id);
            setQueryFilter('view', el.id);
            database.addFilterField('view', el.id);
        }
    };

    useEffect(() => {
        setView(database.view);
        setSelected(database.sort);
    }, [products]);

    return (
        <div className="products">
            <div className="products__options">
                <select className="products__sort" value={selected} onChange={onSort}>
                    <option value="1" disabled>
                        Sort options:
                    </option>
                    <option value="2">Sort by price ↑</option>
                    <option value="3">Sort by price ↓</option>
                    <option value="4">Sort by rating ↑</option>
                    <option value="5">Sort by rating ↓</option>
                    <option value="6">Sort by discount ↑</option>
                    <option value="7">Sort by discount ↓</option>
                </select>
                <div className="products__amount">Found items: {products.length}</div>
                <div className="products__search-bar">
                    <input
                        className="products__search"
                        type="search"
                        placeholder="Search product"
                        onChange={onSearch}
                        value={database.searchCriteria}
                    />
                </div>
                <div className="products__view-wrapper">
                    <div
                        className={view === 'grid' ? 'products__view products__view_active' : 'products__view'}
                        id={'grid'}
                        onClick={onChangeView}
                    >
                        Grid
                    </div>
                    <div
                        className={view === 'list' ? 'products__view products__view_active' : 'products__view'}
                        id={'list'}
                        onClick={onChangeView}
                    >
                        List
                    </div>
                </div>
            </div>
            <div className={productItemsClasses.join(' ')}>
                {products.map((product) => (
                    <ProductCard
                        product={product}
                        cart={cart}
                        setTotalProducts={setTotalProducts}
                        isInCart={cart.currentProducts.some((el) => el.product.id === product.id)}
                        key={product.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsBlock;
