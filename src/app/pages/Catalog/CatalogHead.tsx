import React, {FC, useEffect, useState} from 'react';

import {selectCategories} from "../../store";
import {SORTING_OPTIONS} from "../../constants";
import {useAppSelector} from "../../hooks";

import {IconName, AppliedFilterType, ActiveParamsType, IActiveParams} from "../../types";

import {Icon} from "../../components";

interface ICatalogHead extends IActiveParams {
    sortingOpen: boolean;
    setSortingState: (state: boolean | ((prevState: boolean) => boolean)) => void
}

const CatalogHead: FC<ICatalogHead> =
    ({
         activeParams,
         setParams,
         setSortingState,
         sortingOpen
     }) => {
        const {categories} = useAppSelector(selectCategories);
        const [appliedFilters, setAppliedFilters] = useState<AppliedFilterType[]>([]);

        useEffect(() => {
            fillAppliedFilter();
        }, [activeParams]);

        const toggleSorting = (e: React.MouseEvent) => {
            e.stopPropagation();
            setSortingState(current => !current);
        };

        const handleSorting = (sortOption: string) => {
            if (activeParams.sort && activeParams.sort === sortOption) {
                setParams((current) => {
                    const newState = {...current};
                    delete newState.sort;

                    return newState;
                });

                return;
            }

            setParams((current) => {
                return {...current, sort: sortOption};
            });
        };

        const fillAppliedFilter = () => {
            setAppliedFilters([]);

            !!activeParams.types && activeParams.types.forEach(url => {
                for (let i = 0; i < categories.length; i++) {
                    const foundType = categories[i].types.find(type => type.url === url);

                    if (foundType) {
                        setAppliedFilters((current) => {
                            return [
                                ...current,
                                {
                                    name: foundType.name,
                                    urlParam: foundType.url
                                }
                            ];
                        });
                    }
                }
            });

            if (activeParams.heightFrom) {
                setAppliedFilters((current) => {
                    return [
                        ...current,
                        {
                            name: 'Высота: от ' + activeParams.heightFrom + ' см',
                            urlParam: 'heightFrom'
                        }
                    ];
                });
            }

            if (activeParams.heightTo) {
                setAppliedFilters((current) => {
                    return [
                        ...current,
                        {
                            name: 'Высота: до ' + activeParams.heightTo + ' см',
                            urlParam: 'heightTo'
                        }
                    ];
                });
            }

            if (activeParams.diameterFrom) {
                setAppliedFilters((current) => {
                    return [
                        ...current,
                        {
                            name: 'Диаметр: от ' + activeParams.diameterFrom + ' см',
                            urlParam: 'diameterFrom'
                        }
                    ];
                });
            }

            if (activeParams.diameterTo) {
                setAppliedFilters((current) => {
                    return [
                        ...current,
                        {
                            name: 'Диаметр: до ' + activeParams.diameterTo + ' см',
                            urlParam: 'diameterTo'
                        }
                    ];
                });
            }
        }

        const removeAppliedFilter = (appliedFilter: AppliedFilterType) => {
            if (appliedFilter.urlParam === 'heightFrom' || appliedFilter.urlParam === 'heightTo' ||
                appliedFilter.urlParam === 'diameterFrom' || appliedFilter.urlParam === 'diameterTo') {
                setParams((current) => {
                    const newState = {...current};
                    delete newState.page;
                    delete newState[appliedFilter.urlParam as keyof ActiveParamsType];

                    return newState;
                });

                return;
            }

            setParams((current) => {
                const newState = {...current};
                delete newState.page;

                if (newState.types) {
                    newState.types = newState.types.filter(item => item !== appliedFilter.urlParam);
                }

                return newState;
            });
        };

        return (
            <div className='catalog__head'>
                <div className='catalog__applied-filters'>
                    {
                        appliedFilters.map(appliedFilter =>
                            <div className='catalog__applied-filter' key={appliedFilter.urlParam}>
                                <span>{appliedFilter.name}</span>
                                <span onClick={() => removeAppliedFilter(appliedFilter)}>
                                        <Icon name={IconName.closeCross}/>
                                    </span>
                            </div>
                        )
                    }
                </div>
                <div className={sortingOpen ? 'catalog__sorting open' : 'catalog__sorting'}
                     onClick={(e) => toggleSorting(e)}
                >
                    <div className='catalog__sorting-head'>
                        <span>Сортировать</span>
                        <Icon name={IconName.list}/>
                    </div>
                    <div className='catalog__sorting-body'>
                        {
                            SORTING_OPTIONS.map(option =>
                                <div
                                    className={
                                        activeParams.sort && activeParams.sort === option.value
                                            ? 'catalog__sorting-item active'
                                            : 'catalog__sorting-item'
                                    }
                                    key={option.value}
                                    onClick={() => handleSorting(option.value)}
                                >
                                    {option.name}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    };

export default CatalogHead;