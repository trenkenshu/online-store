import ICart from '../interfaces/cart';
import { IProduct } from '../interfaces/products';

class Cart {
    private cart;
    constructor() {
        this.cart = {
            currentProducts: [],
            subtotal: 0,
            itemsCount: 0,
        };
    }
    public add(item: IProduct) {}
    public remove(item: IProduct) {}
    private refresh() {}
}
