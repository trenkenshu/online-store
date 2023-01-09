import React, { useContext, useState } from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import './ProductCard.scss';

type ProductCardType = {
    product: IProduct;
    key: number;
    isInCart: boolean;
};

const ProductCard = (props: ProductCardType) => {
    const { product, isInCart } = props;
    const { setTotalSum, cart, setTotalProducts, addToCart, dropFromCart } = useContext(StoreContext);
    const [inCart, setIncart] = useState(isInCart);

    return (
        <div className={inCart ? 'product__card product__card_active' : 'product__card'}>
            <div className="product__info">
                <div className="product__body">
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
                        inCart={inCart}
                        name={inCart ? 'Drop from Cart' : 'Add to Cart'}
                        onClick={
                            inCart
                                ? () => dropFromCart({ product, cart, setIncart, setTotalProducts, setTotalSum })
                                : () => addToCart({ product, cart, setIncart, setTotalProducts, setTotalSum })
                        }
                    ></Button>
                    <Link className="product__btn-details" to={`/${product.id}`}>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
