import React, { useState } from 'react';
import './ProductCard.scss';
import Button from '../Button';
import IProductCard from '../../interfaces/productCard';
import { Link } from 'react-router-dom';
// import { IProduct } from '../../interfaces/products';

const ProductCard = (props: IProductCard) => {
    const { product, cart, setTotalItems } = props;
    const [addButton, setAddButton] = useState(true);

    const addToCart = () => {
        console.log('productObject', product);
        cart && cart.add({ product: product, amount: 1 });
        setAddButton(false);
        cart && cart.calculateTotalSum();
        cart && setTotalItems && setTotalItems(cart.getTotalItems());
    };
    const dropFromCart = () => {
        console.log('dropFromCart');
        cart && cart.remove(product.id);
        setAddButton(true);
        cart && cart.calculateTotalSum();
        cart && setTotalItems && setTotalItems(cart.getTotalItems());
    };
    const openProductPage = () => {
        console.log('details=>productID', product.id);
    };

    return (
        <div className={addButton ? 'product__card' : 'product__card product__card_active'}>
            <div className="product__info">
                <div className="product__body" onClick={openProductPage}>
                    <Link className="product__link-img" to={`/${product.id}`}>
                        <div
                            className="product__img"
                            style={{ backgroundImage: `url(${product.thumbnail.toString()})` }}
                        ></div>
                    </Link>
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
                    <Button
                        name={addButton ? 'Add to Cart' : 'Drop from Cart'}
                        onClick={addButton ? addToCart : dropFromCart}
                    ></Button>
                    <Link className="btn" to={`/${product.id}`}>
                        Details
                        {/* <Button name="Details" onClick={openProductPage}></Button> */}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
