import ICart from '../interfaces/cart';
import { IProduct } from '../interfaces/products';

export type ICartItem = {
    product: IProduct;
    amount: number;
};
class CartClass {
    // private cart;
    currentProducts: ICartItem[];
    totalSum: number;
    totalItems: number;
    constructor() {
        this.currentProducts = [];
        this.totalSum = 0; //сумма всей корзины
        this.totalItems = 0; //кол-во всех итемов
    }
    public add(item: ICartItem) {
        this.currentProducts.push(item);
        console.log('cartadd', this.currentProducts);
    }
    public remove(id: number) {
        const removedIndex = this.currentProducts.findIndex((el) => el.product.id === id);
        this.currentProducts.splice(removedIndex, 1);
        console.log('cartremove', this.currentProducts);
    }
    private refresh() {}
    public calculateTotalSum() {
        // let sum = 0;
        this.totalSum = 0;
        this.currentProducts.forEach((el) => {
            const itemTotalPrice = el.product.price * el.amount;
            this.totalSum += itemTotalPrice;
        });
        console.log('fulltotal', this.totalSum);
        return this.totalSum;
    }
    public getTotalItems() {
        const itemCounter = this.currentProducts.map((el) => el.amount);
        this.totalItems = itemCounter.reduce((total, value) => total + value, 0);
        // console.log('itemCounter', itemCounter);
        console.log('totalItems', this.totalItems);
        return this.totalItems;
    }
}

export default CartClass;
