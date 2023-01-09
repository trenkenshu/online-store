import React, { useContext, useState } from 'react';
import DualSlider from '../DualSlider';
import Filter from '../Filter';
import FilterItem from '../FilterItem';
import { StoreContext } from '../../context';
import { MinmaxType } from '../../interfaces/types';
import './FilterBlock.scss';

export const setQueryFilter = (name: string, value: string | MinmaxType): void => {
    const newUrl = new URL(window.location.href);
    if (typeof value !== 'string') {
        newUrl.searchParams.set(name, String(value.min) + '↕' + String(value.max));
    } else if (value.length > 0) {
        newUrl.searchParams.set(name, String(value));
    } else {
        newUrl.searchParams.delete(name);
    }
    window.history.replaceState(null, '', newUrl);
};

export const addQueryFilter = (name: string, value: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.append(name, value);
    window.history.replaceState(null, '', newUrl);
};

export const removeQueryFilter = (name: string, value: string) => {
    const newUrl = new URL(window.location.href);
    const temp: string[] = newUrl.searchParams.getAll(name);
    if (temp.length > 1) {
        const indx = temp.indexOf(value);
        newUrl.searchParams.delete(name);
        temp.splice(indx, 1);
        temp.forEach((item) => {
            newUrl.searchParams.append(name, item);
        });
    } else {
        newUrl.searchParams.delete(name);
    }
    window.history.replaceState(null, '', newUrl);
};

export const resetQueryFilter = (): void => {
    window.history.replaceState(null, '', window.location.pathname);
};

const FiltersBlock = () => {
    const { categories, brands, priceRange, stockRange, priceRangeVals, stockRangeVals, database, setCatalogStates } =
        useContext(StoreContext);
    const [copyName, setCopyName] = useState('Copy link');
    const [filtered, setFiltered] = useState(
        Boolean(database.categoryCriteria.length) || Boolean(database.brandCriteria.length)
    );

    const [isReset, setIsReset] = useState(false);

    const reset = () => {
        database.resetFilter();
        resetQueryFilter();
        const unfiltered = database.runFilter();
        setCatalogStates(unfiltered, 'both');
        setFiltered((prev) => !prev);
        setIsReset((prev) => !prev);
    };

    const copy = () => {
        const url = new URL(window.location.href);
        navigator.clipboard.writeText(url.toString()).catch((err) => {
            console.error('cant copy: ', err);
        });
        setCopyName('Copied!');
        setTimeout(() => setCopyName('Copy link'), 800);
    };

    return (
        <div className="filters">
            <div className="filters__btns">
                <button className="filters__reset" onClick={reset}>
                    Reset filters
                </button>
                <button className="filters__copy" onClick={copy}>
                    {copyName}
                </button>
            </div>
            <Filter name="Category">
                <ul className="filter__list">
                    {categories.map(
                        (categoryObj, index): React.ReactNode => (
                            <FilterItem
                                searchQuery={categoryObj.category as string}
                                maxAmount={categoryObj.maxAmount}
                                currentAmount={categoryObj.currentAmount}
                                db={database}
                                key={index}
                                filterName="category"
                                setCatalogStates={setCatalogStates}
                                addQueryFilter={addQueryFilter}
                                removeQueryFilter={removeQueryFilter}
                                filtered={filtered}
                                setFiltered={setFiltered}
                            />
                        )
                    )}
                </ul>
            </Filter>
            <Filter name="Brand">
                <ul className="filter__list">
                    {brands.map(
                        (brandObj, index): React.ReactNode => (
                            <FilterItem
                                searchQuery={brandObj.brand as string}
                                maxAmount={brandObj.maxAmount}
                                currentAmount={brandObj.currentAmount}
                                db={database}
                                key={index}
                                filterName="brand"
                                setCatalogStates={setCatalogStates}
                                addQueryFilter={addQueryFilter}
                                removeQueryFilter={removeQueryFilter}
                                filtered={filtered}
                                setFiltered={setFiltered}
                            />
                        )
                    )}
                </ul>
            </Filter>
            <Filter name="Price">
                <DualSlider
                    min={priceRange.min}
                    max={priceRange.max}
                    minVal={priceRangeVals.min}
                    maxVal={priceRangeVals.max}
                    db={database}
                    action="price"
                    setCatalogStates={setCatalogStates}
                    setQueryFilter={setQueryFilter}
                    isReset={isReset}
                />
            </Filter>
            <Filter name="Stock">
                <DualSlider
                    min={stockRange.min}
                    max={stockRange.max}
                    minVal={stockRangeVals.min}
                    maxVal={stockRangeVals.max}
                    db={database}
                    action="stock"
                    setCatalogStates={setCatalogStates}
                    setQueryFilter={setQueryFilter}
                    isReset={isReset}
                />
            </Filter>
        </div>
    );
};

export default FiltersBlock;
