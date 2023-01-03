import { IProduct } from '../interfaces/products';

export type CartItemType = {
    product: IProduct;
    amount: number;
    index: number;
    increaseAmount: (id: number) => void;
    decreaseAmount: (id: number) => void;
    currentPage: number;
    itemsPerPage: number;
};

export type currentProductsType = {
    product: IProduct;
    amount: number;
};
class CartClass {
    // private cart;
    currentProducts: currentProductsType[];
    totalSum: number;
    totalProducts: number;
    constructor() {
        this.currentProducts = [];
        this.totalSum = 0; //сумма всей корзины
        this.totalProducts = 0; //кол-во всех итемов
    }
    public add(item: currentProductsType) {
        this.currentProducts.push(item);
        console.log('addCurrPr', this.currentProducts);
    }
    public remove(id: number) {
        const removedIndex = this.currentProducts.findIndex((el) => el.product.id === id);
        this.currentProducts.splice(removedIndex, 1);
        console.log('removeCurrPr', this.currentProducts);
    }
    // private refresh() {}
    public calculateTotalSum() {
        this.totalSum = 0;
        this.currentProducts.forEach((el) => {
            const itemTotalPrice = el.product.price * el.amount;
            this.totalSum += itemTotalPrice;
        });
        // console.log('fulltotal', this.totalSum);
        return this.totalSum;
    }
    public getTotalProducts(): number {
        const itemCounter = this.currentProducts.map((el) => el.amount);
        this.totalProducts = itemCounter.reduce((total, value) => total + value, 0);
        // console.log('totalProducts', this.totalProducts);
        return this.totalProducts;
    }
}

export default CartClass;
