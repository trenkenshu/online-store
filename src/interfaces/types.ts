import CartClass from '../api/cart';
import DBhandler from '../api/database';
import { IProduct } from './products';

export type MinmaxType = {
    min: number;
    max: number;
};

export type UniqueFiltersType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    currentAmount: number;
}[];

export type ICartItem = {
    product: IProduct;
    amount: number;
};

export type ButtonType = {
    name?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    // product?: IProduct;
};

export type minMaxForFilterType = {
    min: number;
    max: number;
    minVal: number;
    maxVal: number;
    db: DBhandler;
    action: 'price' | 'stock';
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
};

export type FilterType = {
    name?: string;
    children?: React.ReactNode;
};

export type FilterItemType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    currentAmount: number;
    db: DBhandler;
    filterName: string;
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
};

export type HeaderType = {
    cart: CartClass;
    totalItems: number;
};

export type LayoutType = {
    children: React.ReactNode;
    cart: CartClass;
    totalItems: number;
};

export type catalogType = {
    products: IProduct[];
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
    categories: UniqueFiltersType;
    brands: UniqueFiltersType;
    priceRange: MinmaxType;
    stockRange: MinmaxType;
    priceRangeVals: MinmaxType;
    stockRangeVals: MinmaxType;
    db: DBhandler;
    cart?: CartClass;
    setTotalItems?: (number: number) => void;
};
