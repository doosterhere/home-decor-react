import React, {FC} from 'react';

import './FilterList.scss';

import {useAppSelector} from "../../../hooks/redux";

import {IActiveParams} from "../Catalog";

import CategoryFilter from "../../../components/CategoryFilter/CategoryFilter";

const FilterList: FC<IActiveParams> =
    ({
         activeParams,
         setParams
     }) => {
        const {categories} = useAppSelector(state => state.category);

        return (
            <div className='catalog__filters'>
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