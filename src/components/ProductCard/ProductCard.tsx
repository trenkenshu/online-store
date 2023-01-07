import React, { useContext, useState } from 'react';
import './ProductCard.scss';
import Button from '../Button';
import IProductCard from '../../interfaces/productCard';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context';
// import { IProduct } from '../../interfaces/products';

const ProductCard = (props: IProductCard) => {
    const { product, cart, setTotalProducts, isInCart } = props;
    const { setTotalSum } = useContext(StoreContext);
    const [addToCartBtn, setAddToCartBtn] = useState(!isInCart);
    // if (cart?.currentProducts.some((el) => el.product.id === id)) {
    //     setAddToCartBtn(false);
    //     console.log(
    //         'id',
    //         cart?.currentProducts.find((el) => el.product.id === id)
    //     );
    // }

    const addToCart = () => {
        console.log('productObject', product);
        cart && cart.add({ product: product, amount: 1 });
        setAddToCartBtn(false);
        cart && cart.calculateTotalSum();
        cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
        cart && setTotalSum(cart.calculateTotalSum());
        localStorage.setItem('cartCurrentProducts', JSON.stringify(cart?.currentProducts));
    };
    const dropFromCart = () => {
        console.log('dropFromCart');
        cart && cart.remove(product.id);
        setAddToCartBtn(true);
        cart && cart.calculateTotalSum();
        cart && setTotalProducts && setTotalProducts(cart.getTotalProducts());
        cart && setTotalSum(cart.calculateTotalSum());
        localStorage.setItem('cartCurrentProducts', JSON.stringify(cart?.currentProducts));
    };

    return (
        <div className={addToCartBtn ? 'product__card' : 'product__card product__card_active'}>
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
                        name={addToCartBtn ? 'Add to Cart' : 'Drop from Cart'}
                        onClick={addToCartBtn ? addToCart : dropFromCart}
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
