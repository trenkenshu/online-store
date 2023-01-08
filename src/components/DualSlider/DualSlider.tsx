import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef, useContext } from 'react';
import DBhandler, { MinmaxType } from '../../api/database';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import './DualSlider.scss';

type minMaxForFilterType = {
    min: number;
    max: number;
    minVal: number;
    maxVal: number;
    db: DBhandler;
    action: 'price' | 'stock';
    setCatalogStates: (data: IProduct[], withRanges: 'both' | 'stock' | 'price') => void;
    setQueryFilter: (name: string, value: MinmaxType) => void;
};

const DualSlider: FC<minMaxForFilterType> = ({
    min,
    max,
    minVal,
    maxVal,
    setCatalogStates,
    setQueryFilter,
    db,
    action,
}) => {
    // console.log('dual', minVal, maxVal);
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
            // setQueryFilter('min' + action, min.toString());
            db.addFilterField<MinmaxType>(action, {
                min: min,
                max: max,
            });
            setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
        } else {
            setMinInputVal(minVal);
            // setQueryFilter('min' + action, minVal.toString());
        }
        if (maxVal === 0) {
            setMaxInputVal(max);
            // setQueryFilter('max' + action, max.toString());
            db.addFilterField<MinmaxType>(action, {
                min: min,
                max: max,
            });
            setCatalogStates(db.runFilter(), action === 'stock' ? 'price' : 'stock');
        } else {
            setMaxInputVal(maxVal);
            // setQueryFilter('max' + action, maxVal.toString());
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
                // onMouseUp={(event: React.MouseEventHandler<HTMLInputElement>) => {
                //     setQueryFilter('min' + action, event.target.value.toString());
                // }}
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
