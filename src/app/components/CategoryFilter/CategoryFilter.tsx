import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import './CategoryFilter.scss';

import {CategoryWithTypesType} from "../../types/categoryWithTypes.type";
import {IconName} from "../../types/icon-name.type";
import {ActiveParamsType} from "../../types/active-params.type";
import {IActiveParams} from "../../views/Catalog/Catalog";

import Icon from "../Icon/Icon";

interface ICategoryFilter extends IActiveParams {
    category?: CategoryWithTypesType | null;
    type?: 'height' | 'diameter' | '' | null;
}

interface ICategoryCheckboxesState {
    url: string;
    checked: boolean;
}

const fillCheckboxesInitialState = (category: CategoryWithTypesType | null): ICategoryCheckboxesState[] | null => {
    if (category) {
        return [...category.types.map(type => ({url: type.url, checked: false}))];
    }

    return null;
}

const CategoryFilter: FC<ICategoryFilter> =
    ({
         category = null,
         type = null,
         activeParams,
         setParams
     }) => {
        const [open, setOpen] = useState(false);
        const [inputsState, setInputsState] =
            useState<ICategoryCheckboxesState[] | null>(() => fillCheckboxesInitialState(category));
        const [from, setFrom] = useState('');
        const [to, setTo] = useState('');
        const [isNotFirstRender, setIsNotFirstRender] = useState(false);
        const [searchParams] = useSearchParams();

        useEffect(() => {
            if (isNotFirstRender && category?.types?.length &&
                category.types.some(type => activeParams.types?.find(item => item === type.url))) {
                setInputsState((initial) => {
                    if (initial && activeParams.types) {
                        const newState = [...initial];

                        newState.forEach(state => {
                            state.checked = !!activeParams.types?.find(item => item === state.url);
                        });

                        return newState;
                    }

                    return initial;
                });

                setOpen(true);
            }

            if (isNotFirstRender && type && type === 'height') {
                if (activeParams.heightFrom || activeParams.heightTo) {
                    setOpen(true);
                }
                setFrom(activeParams.heightFrom ? activeParams.heightFrom.toString() : '');
                setTo(activeParams.heightTo ? activeParams.heightTo.toString() : '');
                return;
            }

            if (isNotFirstRender && type && type === 'diameter') {
                if (activeParams.diameterFrom || activeParams.diameterTo) {
                    setOpen(true);
                }
                setFrom(activeParams.diameterFrom ? activeParams.diameterFrom.toString() : '');
                setTo(activeParams.diameterTo ? activeParams.diameterTo.toString() : '');
                return;
            }

            if (!isNotFirstRender) {
                setIsNotFirstRender(true);
            }
        }, [isNotFirstRender]);

        useEffect(() => {
            if (type === 'height' && !searchParams.get('heightFrom') && !activeParams.heightFrom) {
                setFrom('');
            }

            if (type === 'height' && !searchParams.get('heightTo') && !activeParams.heightTo) {
                setTo('');
            }

            if (type === 'diameter' && !searchParams.get('diameterFrom') && !activeParams.diameterFrom) {
                setFrom('');
            }

            if (type === 'diameter' && !searchParams.get('diameterTo') && !activeParams.diameterTo) {
                setTo('');
            }

            if (category && category.types.some(type => activeParams.types?.find(url => url === type.url))) {
                setOpen(true);
            }

            setInputsState(current => {
                if (current) {
                    const newState = [...current];

                    newState.forEach(state => {
                        state.checked = !!activeParams.types?.find(url => url === state.url);
                    });

                    return newState;
                }

                return current;
            });
        }, [searchParams, activeParams]);

        const title = () => {
            if (category) {
                return category.name;
            }

            if (type && type === 'height') {
                return 'Высота';
            }

            if (type && type === 'diameter') {
                return 'Диаметр';
            }

            return '';
        };

        const toggle = () => {
            setOpen(current => !current);
        };

        const updateFilterParam = (typeUrl: string, checked: boolean) => {
            if (activeParams.types && inputsState) {
                const existingTypeInParams: string | undefined = activeParams.types.find(item => item === typeUrl);

                if (existingTypeInParams && !checked) {
                    setParams((current: ActiveParamsType) => {
                        const filteredTypes = current?.types?.filter(item => item !== typeUrl);
                        const {page, ...newState} = current;
                        return {...newState, types: filteredTypes};
                    });
                }

                if (!existingTypeInParams && checked) {
                    setParams((current) => {
                        const types = [...current.types as string[], typeUrl];
                        const {page, ...newState} = current;
                        return {...newState, types}
                    });
                }
            }

            if (!activeParams.types && checked) {
                setParams((current) => {
                    const types = [typeUrl];
                    const {page, ...newState} = current;
                    return {...newState, types};
                });
            }
        };

        const updateFilterParamFromTo = (param: string, value: string) => {
            if (param === 'heightTo' || param === 'heightFrom' || param === 'diameterTo' || param === 'diameterFrom') {
                if (activeParams[param as keyof ActiveParamsType] && !value) {
                    if (param.includes('From')) {
                        setFrom('');
                    }

                    if (param.includes('To')) {
                        setTo('');
                    }

                    setParams((current) => {
                        const {[param as keyof ActiveParamsType]: removed, page, ...rest} = current;
                        return {...rest}
                    });
                    return;
                }

                if (value) {
                    setParams((current) => {
                        const {page, ...newState} = current;
                        return {
                            ...newState,
                            [param as keyof ActiveParamsType]: Number(value)
                        }
                    });
                }

                if (value && param.includes('From')) {
                    setFrom(value);
                }

                if (value && param.includes('To')) {
                    setTo(value);
                }
            }
        };

        return (
            <div className={open ? 'catalog__filter open' : 'catalog__filter'}>
                <div className='catalog__filter-head' onClick={toggle}>
                    <span>{title()}</span>
                    <Icon name={IconName.listShort}/>
                </div>
                <div className='catalog__filter-body'>
                    {!!category &&
                        category.types.map(type => {
                            return (
                                <label className='catalog__filter-checkbox' key={type.id}>
                                    <input
                                        type="checkbox"
                                        name={type.name}
                                        checked={
                                            inputsState
                                                ? inputsState.find(input => input.url === type.url)?.checked
                                                : false
                                        }
                                        onChange={(e) => updateFilterParam(type.url, e.target.checked)}
                                    />
                                    <span>{type.name}</span>
                                </label>
                            );
                        })
                    }
                    {!!type &&
                        <div className='catalog__filter-from-to'>
                            <span>от</span>
                            <input type="number"
                                   min="0"
                                   step="1"
                                   className='small-input'
                                   name={title() + 'From'}
                                   value={from}
                                   onChange={(e) =>
                                       updateFilterParamFromTo(type + 'From', e.target.value)}
                            />
                            <span>до</span>
                            <input type="number"
                                   min="0"
                                   step="1"
                                   className='small-input'
                                   name={title() + 'To'}
                                   value={to}
                                   onChange={(e) =>
                                       updateFilterParamFromTo(type + 'To', e.target.value)}
                            />
                            <span>см</span>
                        </div>
                    }
                </div>
            </div>
        );
    };

export default CategoryFilter;