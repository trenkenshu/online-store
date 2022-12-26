import React from 'react';
import DBhandler, { MinmaxType } from '../../api/database';
import { IProduct } from '../../interfaces/products';
import './FilterItem.scss';

export type FilterItemType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    currentAmount: number;
    db: DBhandler;
    filterName: string;
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
};
const FilterItem = (props: FilterItemType) => {
    const { category, brand, maxAmount, currentAmount, db, filterName, setCatalogStates } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            db.addFilterField<string>(filterName, category ? category : brand ? brand : '');
            const filterData = db.runFilter();
            setCatalogStates(filterData, 'both');
        } else {
            db.removeFilterField(filterName, category ? category : brand ? brand : '');
            const filterData = db.runFilter();
            setCatalogStates(filterData, 'both');
        }
    };

    return (
        <div className="filter__item">
            <input type="checkbox" className="filter__checkbox" id={category} onChange={handleChange}></input>
            <label className="filter__label" htmlFor={category} data-name={category}></label>
            <p>{category ? category : brand ? brand : ''} </p>
            <p className="filter__label-amount">
                <span className="filter__label-current" data-current="">
                    {currentAmount} / </span>
                {maxAmount}
            </p>
        </div>
    );
};

export default FilterItem;
