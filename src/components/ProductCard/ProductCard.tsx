import React, { useContext, useState } from 'react';
import './ProductCard.scss';
import Button from '../Button';
import IProductCard from '../../interfaces/productCard';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import CartClass from '../../api/cart';
// import { IProduct } from '../../interfaces/products';

export type AddDropCartType = {
    product: IProduct;
    cart: CartClass;
    setIncart: (data: boolean) => void;
    setTotalProducts: (data: number) => void;
    setTotalSum: (data: number) => void;
};

const ProductCard = (props: IProductCard) => {
    const { product, isInCart } = props;
    const { setTotalSum, cart, setTotalProducts, addToCart, dropFromCart } = useContext(StoreContext);
    const [inCart, setIncart] = useState(isInCart);
    // if (cart?.currentProducts.some((el) => el.product.id === id)) {
    //     setIncart(false);
    //     console.log(
    //         'id',
    //         cart?.currentProducts.find((el) => el.product.id === id)
    //     );
    // }
    // const addToCart = ({ product, cart, setIncart, setTotalProducts, setTotalSum }: AddDropCartType) => {
    //     console.log('productObject', product);
    //     cart && cart.add({ product: product, amount: 1 });
    //     setIncart(false);
    //     cart && cart.calculateTotalSum();
    //     cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
    //     cart && setTotalSum(cart.calculateTotalSum());
    //     localStorage.setItem('cartCurrentProducts', JSON.stringify(cart.currentProducts));
    // };
    // const dropFromCart = ({ product, cart, setIncart, setTotalProducts, setTotalSum }: AddDropCartType) => {
    //     console.log('dropFromCart');
    //     cart && cart.remove(product.id);
    //     setIncart(true);
    //     cart && cart.calculateTotalSum();
    //     cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
    //     cart && setTotalSum(cart.calculateTotalSum());
    //     localStorage.setItem('cartCurrentProducts', JSON.stringify(cart?.currentProducts));
    // };

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
                        name={inCart ? 'Drop from Cart' : 'Add to Cart'}
                        onClick={
                            inCart
                                ? () => dropFromCart({ product, cart, setIncart, setTotalProducts, setTotalSum })
                                : () => addToCart({ product, cart, setIncart, setTotalProducts, setTotalSum })
                        }
                    ></Button>
                    <Link className="btn" to={`/${product.id}`}>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
