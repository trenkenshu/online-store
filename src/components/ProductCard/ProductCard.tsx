import React from 'react';
import './ProductCard.scss';
import Button from '../Button';
import IProductCard from '../../interfaces/productCard';
// import { IProduct } from '../../interfaces/products';

const ProductCard = (props: IProductCard) => {
    const { product } = props;

    return (
        <div className="product__card">
            <div className="product__img" style={{ backgroundImage: `url(${product.thumbnail.toString()})` }}></div>
            <div className="product__info">
                <div className="product__body">
                    <div className="product__title">
                        <h4 className="product__name">{product.title}</h4>
                        <div className="product__brand">{product.brand}</div>
                    </div>
                    <div className="product__data">
                        <div className="product__category">
                            Category: <span className="product__value">{product.category}</span>
                        </div>
                        <div className="product__price">
                            Price: <span className="product__value">{product.price} €</span>
                        </div>
                        <div className="product__discount">
                            Discount: <span className="product__value">{product.discountPercentage}%</span>
                        </div>
                        <div className="product__rating">
                            Rating <span className="product__value">{product.rating}</span>
                        </div>
                        <div className="product__stock">
                            Stock: <span className="product__value">{product.stock}</span>
                        </div>
                    </div>
                </div>
                <div className="product__btns">
                    <Button name="Add to Cart"></Button>
                    <Button name="Details"></Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
