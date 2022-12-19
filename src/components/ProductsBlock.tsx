import React from 'react';
import '../scss/ProductsBlock.scss'
function ProductsBlock () {
  return (
    <div className='product__block'>
        <div className='product__options'>
          <select className="product__sort">
            <option value="1" disabled selected>Sort options: </option>
            <option value="2">Sort by price ↑</option>
            <option value="3">Sort by price ↓</option>
            <option value="4">Sort by rating ↑</option>
            <option value="5">Sort by rating ↓</option>
            <option value="6">Sort by discount ↑</option>
            <option value="7">Sort by discount ↓</option>
          </select>
          <div className="product__amount">Found items</div>
          <div className="product__search-bar">
            <input type="search" placeholder='Search product'/>
          </div>
          <div className="product__view">View</div>
        </div>
        <div className="product__list">

        </div>
    </div>
  )
}

export default ProductsBlock;