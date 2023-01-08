import { CurrentProductsType } from '../interfaces/types';
class CartClass {
    currentProducts: CurrentProductsType[];
    totalSum: number;
    totalProducts: number;
    constructor() {
        this.currentProducts = [];
        this.totalSum = 0; //сумма всей корзины
        this.totalProducts = 0; //кол-во всех итемов
    }
    public add(item: CurrentProductsType) {
        this.currentProducts.push(item);
        return this.currentProducts.slice(0);
    }
    public remove(id: number) {
        const removedIndex = this.currentProducts.findIndex((el) => el.product.id === id);
        this.currentProducts.splice(removedIndex, 1);
    }
    public calculateTotalSum() {
        this.totalSum = 0;
        this.currentProducts.forEach((el) => {
            const itemTotalPrice = el.product.price * el.amount;
            this.totalSum += itemTotalPrice;
        });
        return this.totalSum;
    }
    public getTotalProducts(): number {
        const itemCounter = this.currentProducts.map((el) => el.amount);
        this.totalProducts = itemCounter.reduce((total, value) => total + value, 0);
        return this.totalProducts;
    }
}

export default CartClass;
