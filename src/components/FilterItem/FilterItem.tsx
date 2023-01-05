import React, { useState, useEffect } from 'react';
import DBhandler from '../../api/database';
import { IProduct } from '../../interfaces/products';
import './FilterItem.scss';

export type FilterItemType = {
    searchQuery: string;
    maxAmount: number;
    currentAmount: number;
    db: DBhandler;
    filterName: 'category' | 'brand';
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
    removeQueryFilter: (name: string, value: string) => void;
    addQueryFilter: (name: string, value: string) => void;
    filtered: boolean;
    setFiltered: (isFiltered: boolean) => void;
};
const FilterItem = (props: FilterItemType) => {
    const {
        searchQuery,
        maxAmount,
        currentAmount,
        db,
        filterName,
        setCatalogStates,
        addQueryFilter,
        removeQueryFilter,
        filtered,
    } = props;

    const [checked, setChecked] = useState(db.hasFilter(filterName, searchQuery.toLowerCase()));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            addQueryFilter(filterName, searchQuery);
            db.addFilterField<string>(filterName, searchQuery);
            const filterData = db.runFilter();
            setCatalogStates(filterData, 'both');
            setChecked(db.hasFilter(filterName, searchQuery.toLowerCase()));
            console.log(currentAmount);
        } else {
            removeQueryFilter(filterName, searchQuery);
            db.removeFilterField(filterName, searchQuery);
            const filterData = db.runFilter();
            setCatalogStates(filterData, 'both');
            setChecked(db.hasFilter(filterName, searchQuery.toLowerCase()));
            console.log(currentAmount);
        }
    };

    useEffect(() => {
        setChecked(db.hasFilter(filterName, searchQuery.toLowerCase()));
    }, [filtered]);

    return (
        <div className={currentAmount === 0 ? 'filter__item filter__item_empty' : 'filter__item'}>
            <div className="filter__body">
                <input
                    type="checkbox"
                    className="filter__checkbox"
                    checked={checked}
                    id={searchQuery}
                    onChange={handleChange}
                ></input>
                <label className="filter__label" htmlFor={searchQuery} data-name={searchQuery}></label>
                <p className="filter__name">{searchQuery}</p>
            </div>
            <div className="filter__amount">
                <p className="filter__current-amount">{currentAmount} /</p>
                <p className="filter__total-amount">{maxAmount}</p>
            </div>
        </div>
    );
};

export default FilterItem;
