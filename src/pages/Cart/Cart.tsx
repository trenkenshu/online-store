import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CartItemType } from '../../api/cart';
import CartHeader from '../../components/CartHeader';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import Modal from '../../components/Modal';
import { StoreContext } from '../../context';
import './Cart.scss';

const Cart = () => {
    const { cart, totalSum, setTotalProducts, setTotalSum } = useContext(StoreContext);
    // const [newTotalSum, setNewTotalSum] = useState(totalSum);
    const [modal, setModal] = useState(false);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    // const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const totalPages = Math.ceil(cart.currentProducts.length / itemsPerPage);
    const currentCartList = cart.currentProducts.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        console.log('useEffect on itemsPerPage', itemsPerPage);
        if (currentPage > totalPages && currentPage > 1) {
            // console.log('inside', totalPages);
            setCurrentPage(Math.ceil(cart.currentProducts.length / itemsPerPage));
        }
    }, [itemsPerPage]);

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
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        if (value < 1) {
            value = 1;
        }
        setItemsPerPage(value);
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
                    handleChange={handleChange}
                />
                {currentCartList.map((item, index) => (
                    <CartItem
                        product={item.product}
                        amount={item.amount}
                        index={index + 1}
                        key={index}
                        increaseAmount={increaseAmount}
                        decreaseAmount={decreaseAmount}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                ))}
            </div>
            <CartSummary setModal={setModal} />
            {modal && <Modal setModal={setModal} />}
        </div>
    );
};

export default Cart;
