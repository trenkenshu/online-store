import React from 'react';
import './Filter.scss';

type FilterType = {
    name?: string;
    children?: React.ReactNode;
};
export const Filter = (props: FilterType) => {
    const { name, children } = props;

    return (
        <div className="filter">
            <h3 className="filter__name">{name}</h3>
            {children}
        </div>
    );
};

export default Filter;
