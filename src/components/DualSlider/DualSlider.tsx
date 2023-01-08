import React, { ChangeEvent, FC, useEffect, useState, useRef, useContext } from 'react';
import DBhandler from '../../api/database';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import { MinmaxType } from '../../interfaces/types';
import './DualSlider.scss';

type minMaxForRangeFilterType = {
    min: number;
    max: number;
    minVal: number;
    maxVal: number;
    db: DBhandler;
    action: 'price' | 'stock';
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
    setQueryFilter: (name: string, value: MinmaxType) => void;
};

const DualSlider: FC<minMaxForRangeFilterType> = ({
    min,
    max,
    minVal,
    maxVal,
    setCatalogStates,
    setQueryFilter,
    db,
    action,
}) => {
    const [minInputVal, setMinInputVal] = useState(min);
    const [maxInputVal, setMaxInputVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);
    let clicked = false;
    const { products } = useContext(StoreContext);

    useEffect(() => {
        if (minVal === 0) {
            setMinInputVal(min);
            db.addFilterField<MinmaxType>(action, {
                min: min,
                max: max,
            });
            setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
        } else {
            setMinInputVal(minVal);
        }
        if (maxVal === 0) {
            setMaxInputVal(max);
            db.addFilterField<MinmaxType>(action, {
                min: min,
                max: max,
            });
            setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
        } else {
            setMaxInputVal(maxVal);
        }
    }, [minVal, maxVal]);

    if (range.current) {
        range.current.style.left = `0%`;
        range.current.style.width = `100%`;
    }

    return (
        <div className="slider">
            <input
                type="range"
                min={min}
                max={max}
                value={minInputVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxInputVal - 1);
                    clicked = true;

                    db.addFilterField<MinmaxType>(action, {
                        min: value,
                        max: maxInputVal,
                    });

                    setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
                    setMinInputVal(value);
                    minValRef.current = value;
                    if (clicked) {
                        setQueryFilter(action, {
                            min: value,
                            max: maxInputVal,
                        });
                    }
                }}
                className="slider__thumb slider__thumb-left"
                style={{ zIndex: minInputVal > max - 100 ? '5' : '3' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxInputVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(Number(event.target.value), minInputVal + 1);
                    clicked = true;
                    db.addFilterField<MinmaxType>(action, {
                        min: minInputVal,
                        max: value,
                    });
                    setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
                    setMaxInputVal(value);
                    maxValRef.current = value;
                    if (clicked)
                        setQueryFilter(action, {
                            min: minInputVal,
                            max: value,
                        });
                }}
                className="slider__thumb slider__thumb-right"
            />
            <div className="slider__wrapper">
                <div className="slider__notfound" style={{ display: products.length ? 'none' : 'block' }}>
                    Not found
                </div>
                <div className="slider__from" style={{ display: products.length ? 'block' : 'none' }}>
                    {minInputVal}
                </div>
                <div className="slider__to" style={{ display: products.length ? 'block' : 'none' }}>
                    {maxInputVal}
                </div>
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
            </div>
        </div>
    );
};

export default DualSlider;
