import React from 'react';
import DBhandler from '../../api/database';
import { IProduct } from '../../interfaces/products';
import './FilterItem.scss';

export type FilterItemType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    db: DBhandler;
    filterName: string;
    setCatalogStates: (data: IProduct[]) => void;
};
const FilterItem = (props: FilterItemType) => {
    const { category, brand, maxAmount, db, filterName, setCatalogStates } = props;
    // console.log('fitem', props);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            db.addFilterField<string>(filterName, category ? category : brand ? brand : '');
            const filterData = db.runFilter();
            console.log('changeData', filterData);
            setCatalogStates(filterData);
        } else {
            db.removeFilterField(filterName, category ? category : brand ? brand : '');
            const filterData = db.runFilter();
            console.log('deleteData', filterData);
            setCatalogStates(filterData);
        }
    };

    return (
        <div className="filter__item">
            <input type="checkbox" className="filter__checkbox" id={category} onChange={handleChange}></input>
            <label className="filter__label" htmlFor={category} data-name={category}></label>
            <p>{category ? category : brand ? brand : ''}</p>
            <p>{maxAmount}</p>
        </div>
    );
};

export default FilterItem;
