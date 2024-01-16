import React, {FC} from 'react';

import './FilterList.scss';

import {selectCategories} from "../../store";

import {useAppSelector} from "../../hooks/redux";

import {IActiveParams} from "../../types/iactive-params.interface";

import CategoryFilter from "../CategoryFilter/CategoryFilter";

const FilterList: FC<IActiveParams> =
    ({
         activeParams,
         setParams
     }) => {
        const {categories} = useAppSelector(selectCategories);

        return (
            <div className='filter-list'>
                {
                    categories.map(category =>
                        <CategoryFilter
                            key={category.id}
                            category={category}
                            activeParams={activeParams}
                            setParams={setParams}
                        />
                    )
                }
                <CategoryFilter
                    type={"height"}
                    activeParams={activeParams}
                    setParams={setParams}
                />
                <CategoryFilter
                    type={"diameter"}
                    activeParams={activeParams}
                    setParams={setParams}
                />
            </div>
        );
    };

export default FilterList;