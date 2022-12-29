import React, { useContext, useEffect, useState } from 'react';
import { CartItemType } from '../../api/cart';
import CartHeader from '../../components/CartHeader';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import { StoreContext } from '../../context';
import './Cart.scss';

const Cart = () => {
    const { cart, totalProducts, setTotalProducts, setTotalSum } = useContext(StoreContext);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(cart.currentProducts.length / itemsPerPage);
    const currentCartList = cart.currentProducts.slice(indexOfFirstItem, indexOfLastItem);

    const increaseAmount = (id: number) => {
        const cartItem = cart.currentProducts.find((el) => el.product.id === id);
        const cartItemIndex = cart.currentProducts.findIndex((el) => el.product.id === id);
        if (cartItem && cartItem?.amount > 0 && cartItem?.amount < cartItem.product.stock) {
            cart.currentProducts[cartItemIndex].amount += 1;
            setTotalProducts(cart.getTotalProducts());
            setTotalSum(cart.calculateTotalSum());
        }
    };
    const decreaseAmount = (id: number) => {
        const cartItem = cart.currentProducts.find((el) => el.product.id === id);
        const cartItemIndex = cart.currentProducts.findIndex((el) => el.product.id === id);
        if (cartItem && cartItem?.amount > 0 && cartItem?.amount <= cartItem.product.stock) {
            cart.currentProducts[cartItemIndex].amount -= 1;
            setTotalProducts(cart.getTotalProducts());
            setTotalSum(cart.calculateTotalSum());
        }
        if (cart.currentProducts[cartItemIndex].amount === 0) {
            const id = cart.currentProducts[cartItemIndex].product.id;
            console.log('remove ID', id);
            cart.remove(id);
            if (cart.currentProducts.length % itemsPerPage === 0 && currentPage === totalPages) {
                setCurrentPage(currentPage - 1);
            }
        }
    };
    return (
        <div className="cart">
            <div className="cart__list">
                <CartHeader
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    totalPages={totalPages}
                />
                {currentCartList.map((item, index) => (
                    <CartItem
                        product={item.product}
                        amount={item.amount}
                        // cartList={cartList}
                        // setCartlist={setCartlist}
                        index={index + 1}
                        key={index}
                        increaseAmount={increaseAmount}
                        decreaseAmount={decreaseAmount}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                ))}
            </div>
            <CartSummary totalProducts={totalProducts} />
        </div>
    );
};

export default Cart;
