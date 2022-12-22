import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { MinmaxType } from '../../api/database';
import './DualSlider.scss';

const DualSlider: FC<MinmaxType> = ({ min, max }) => {
    // console.log('dual', min, max);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
    }, [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <div className="slider">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="slider__thumb slider__thumb-left"
                style={{ zIndex: minVal > max - 100 ? '5' : '3' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="slider__thumb slider__thumb-right"
            />
            <div className="slider__wrapper">
                <div className="slider__from">{minVal}</div>
                <div className="slider__to">{maxVal}</div>
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
            </div>
        </div>
    );
};

export default DualSlider;
