import React from 'react';
import './ProductsBlock.scss'
import Button from '../Button/Button';
// import ICatalog from './interfaces/catalog';
import { IProducts } from '../interfaces/products';
import ProductCard from '../ProductCard';

const ProductsBlock = (props:IProducts) => {
  const {products} = props;
  console.log('ProductsBlock',props)
  
  return (
    <div className='product__block'>
        <div className='product__options'>
          <select className="product__sort" value={1}>
            <option value="1" disabled>Sort options: </option>
            <option value="2">Sort by price ↑</option>
            <option value="3">Sort by price ↓</option>
            <option value="4">Sort by rating ↑</option>
            <option value="5">Sort by rating ↓</option>
            <option value="6">Sort by discount ↑</option>
            <option value="7">Sort by discount ↓</option>
          </select>
          <div className="product__amount">Found items: {products.length}</div>
          <div className="product__search-bar">
            <input className='product__search' type="search" placeholder='Search product'/>
          </div>
          {/* <select className="product__view" value={1}>
            <option value="1" disabled>View:</option>
            <option value="2">Grid</option>
            <option value="3">List</option>
          </select> */}
          <div className='product__view-wrapper'>
            <div className="product__view product__view_active">Grid</div>
            <div className="product__view">List</div>
          </div>

        </div>
        <div className="product__list">
         {products.map((product) => <ProductCard product={product} key={product.id}/>)}
        </div>
    </div>
  )
}

export default ProductsBlock;