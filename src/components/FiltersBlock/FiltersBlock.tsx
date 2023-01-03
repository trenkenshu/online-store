import React, { useContext } from 'react';
import Button from '../Button/Button';
import DualSlider from '../DualSlider';
import Filter from '../Filter';
import FilterItem from '../FilterItem';
import './FilterBlock.scss';
import { StoreContext } from '../../context';
import { useSearchParams } from 'react-router-dom';
import { MinmaxType } from '../../api/database';

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

const FiltersBlock = () => {
    const { categories, brands, priceRange, stockRange, priceRangeVals, stockRangeVals, database, setCatalogStates } =
        useContext(StoreContext);
    const reset = () => console.log(`reset`);
    const copy = () => console.log(`copy`);
    const [searchParams] = useSearchParams();
    console.log([...searchParams.getAll('category')]);
    /*const sp: {
        [key: string]: string;
    } = {};
    for (const entry of searchParams.entries()) {
        sp[entry[0]] = entry[1];
    }
    console.log(sp);*/
    const newUrl = new URL(window.location.href);
    window.history.replaceState(null, '', newUrl);
    console.log(newUrl.searchParams.getAll('trert'));

    return (
        <div className="filters">
            <div className="filters__btns">
                <Button name="Reset filters" onClick={reset}></Button>
                <Button name="Copy link" onClick={copy}></Button>
            </div>
            <Filter name="Category">
                <div className="filter__list">
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
                            />
                        )
                    )}
                </div>
            </Filter>
            <Filter name="Brand">
                <div className="filter__list">
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
                            />
                        )
                    )}
                </div>
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
                />
            </Filter>
        </div>
    );
};

export default FiltersBlock;
