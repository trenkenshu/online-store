import React from 'react';
import Button from '../Button/Button';
import DualSlider from '../DualSlider';
import Filter from '../Filter';
import FilterItem from '../FilterItem';
import './FilterBlock.scss';
import { catalogType } from '../../pages/Catalog';

const FiltersBlock = (props: catalogType) => {
    const { products, categories, brands, priceRange,
        stockRange, priceRangeVals, stockRangeVals, db, setCatalogStates } = props;

    return (
        <div className="filters">
            <div className="filters__btns">
                <Button name="Reset filters"></Button>
                <Button name="Copy link"></Button>
            </div>
            <Filter name="Category">
                <div className="filter__list">
                    {categories.map(
                        (categoryObj, index): React.ReactNode => (
                            <FilterItem
                                category={categoryObj.category}
                                maxAmount={categoryObj.maxAmount}
                                currentAmount={categoryObj.currentAmount}
                                db={db}
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
                                db={db}
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
                    minVal = {priceRangeVals.min}
                    maxVal = {priceRangeVals.max}
                    db = {db}
                    action = 'price'
                    setCatalogStates={setCatalogStates} />
            </Filter>
            <Filter name="Stock">
                <DualSlider
                    min={stockRange.min}
                    max={stockRange.max}
                    minVal = {stockRangeVals.min}
                    maxVal = {stockRangeVals.max}
                    db = {db}
                    action = 'stock'
                    setCatalogStates={setCatalogStates} />
            </Filter>
        </div>
    );
};

export default FiltersBlock;
