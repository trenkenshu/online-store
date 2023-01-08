import CartClass from '../api/cart';
import DBhandler from '../api/database';
import { IProduct } from './products';
import { AddDropCartType, CurrentProductsType, MinmaxType, rangesType, UniqueFiltersType } from './types';

export interface StoreType {
    database: DBhandler;
    cart: CartClass;
    products: IProduct[];
    categories: UniqueFiltersType;
    brands: UniqueFiltersType;
    priceRange: MinmaxType;
    stockRange: MinmaxType;
    priceRangeVals: MinmaxType;
    stockRangeVals: MinmaxType;
    totalProducts: number;
    setTotalProducts: (number: number) => void;
    totalSum: number;
    setTotalSum: (number: number) => void;
    setCatalogStates: (data: IProduct[], withRanges: rangesType) => void;
    addQueryFilter: (name: string, value: string) => void;
    setQueryFilter: (name: string, value: MinmaxType | string) => void;
    removeQueryFilter: (name: string, value: string) => void;
    parseQueryFilters: () => rangesType;
    isOrderSumbitted: boolean;
    setIsOrderSumbitted: (data: boolean) => void;
    loadCartProductsLS: () => CurrentProductsType[];
    modal: boolean;
    setModal: (data: boolean) => void;
    addToCart: (args: AddDropCartType) => void;
    dropFromCart: (args: AddDropCartType) => void;
}
