import React, {FC} from 'react';

import './FilterList.scss';

import {selectCategories} from "../../store";
import {useAppSelector} from "../../hooks";

import {IActiveParams} from "../../types";

import {CategoryFilter} from "../../components";

export const FilterList: FC<IActiveParams> =
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