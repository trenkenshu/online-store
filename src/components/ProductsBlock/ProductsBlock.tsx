import React, { useState } from 'react';
import './ProductsBlock.scss';
// import Button from '../Button';
// import ICatalog from './interfaces/catalog';
import { IProducts } from '../../interfaces/products';
import ProductCard from '../ProductCard';

const ProductsBlock = (props: IProducts) => {
    const { products, cart, setTotalItems } = props;
    // console.log('ProductsBlock', props);
    // console.log('ProductsBlockCART', cart);
    const [view, setView] = useState('grid');
    const productItemsClasses = ['products__items'];

    // const log = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log(event.currentTarget);
    // };
    const changeView = (newView: string) => {
        setView(newView);
    };
    if (view === 'list') {
        productItemsClasses.push('products__items_list');
    }
    // console.log('classes', productItemsClasses);
    return (
        <div className="products">
            <div className="products__options">
                <select className="products__sort" value={1}>
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
                    <input className="products__search" type="search" placeholder="Search product" />
                </div>
                <div className="products__view-wrapper">
                    <div
                        className={view === 'grid' ? 'products__view products__view_active' : 'products__view'}
                        onClick={() => changeView('grid')}
                    >
                        Grid
                    </div>
                    <div
                        className={view === 'list' ? 'products__view products__view_active' : 'products__view'}
                        onClick={() => changeView('list')}
                    >
                        List
                    </div>
                </div>
            </div>
            <div className={productItemsClasses.join(' ')}>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} cart={cart} setTotalItems={setTotalItems} />
                ))}
            </div>
        </div>
    );
};

export default ProductsBlock;
