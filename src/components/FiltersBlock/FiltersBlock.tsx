import React, { useContext } from 'react';
import Button from '../Button/Button';
import DualSlider from '../DualSlider';
import Filter from '../Filter';
import FilterItem from '../FilterItem';
import './FilterBlock.scss';
import { catalogType } from '../../pages/Catalog/Catalog';
import { StoreContext } from '../../context';

const FiltersBlock = () => {
    const { categories, brands, priceRange, stockRange, priceRangeVals, stockRangeVals, database, setCatalogStates } =
        useContext(StoreContext);
    const reset = () => console.log(`reset`);
    const copy = () => console.log(`copy`);

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
                                category={categoryObj.category}
                                maxAmount={categoryObj.maxAmount}
                                currentAmount={categoryObj.currentAmount}
                                db={database}
                                key={index}
                                filterName="category"
                                setCatalogStates={setCatalogStates}
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
                                brand={brandObj.brand}
                                maxAmount={brandObj.maxAmount}
                                currentAmount={brandObj.currentAmount}
                                db={database}
                                key={index}
                                filterName="brand"
                                setCatalogStates={setCatalogStates}
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
                />
            </Filter>
        </div>
    );
};

export default FiltersBlock;
