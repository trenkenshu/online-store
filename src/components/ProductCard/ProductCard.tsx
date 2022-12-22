import React from 'react';
import './productCard.scss'
import Button from '../Button';
import IProductCard from '../interfaces/productCard';
import { IProduct } from '../interfaces/products';

const ProductCard = (props: IProductCard) => {
  const {product} = props;
  console.log('ProductCard',props)

  return(
    <div className='product__card'>
      {/* <img src={props.product.thumbnail.toString()} className="product__img" alt={props.product.title}></img> */}
      <div  className="product__img" style={{backgroundImage: `url(${product.thumbnail})`}}></div>
      <h4 className="product__name">{product.title}</h4>
      <div className="product__brand">{product.brand}</div>
      <div className="product__category">Category: <span className='product__value'>{product.category}</span></div>
      <div className="product__info">
        <div className="product__price">Price: <span className='product__value'>{product.price} €</span></div>
        <div className="product__discount">Discount: <span className='product__value'>{product.discountPercentage}%</span></div>
        <div className="product__rating">Rating <span className='product__value'>{product.rating}</span></div>
        <div className="product__stock">Stock: <span className='product__value'>{product.stock}</span></div>
      </div>
      <div className="product__btns">
        <Button name="Add to Cart"></Button>
        <Button name="Details"></Button>
      </div>
    </div>
  )
}

export default ProductCard;