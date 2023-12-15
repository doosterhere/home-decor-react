import React, {FC, useState} from 'react';

import './CategoryFilter.scss';

import {CategoryWithTypesType} from "../../types/categoryWithTypes.type";
import Icon from "../Icon/Icon";
import {IconName} from "../../types/icon-name.type";

interface ICategoryFilter {
    categoryWithTypes?: CategoryWithTypesType | null;
    type?: 'height' | 'diameter' | '' | null;
}

const CategoryFilter: FC<ICategoryFilter> =
    ({
         categoryWithTypes = null,
         type = null
     }) => {
        const [open, setOpen] = useState(false);

        const title = () => {
            if (categoryWithTypes) {
                return categoryWithTypes.name;
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
            setOpen(!open);
        };

        return (
            <div className={open ? 'catalog__filter open' : 'catalog__filter'}>
                <div className='catalog__filter-head' onClick={toggle}>
                    <span>{title()}</span>
                    <Icon name={IconName.listShort}/>
                </div>
                <div className='catalog__filter-body'>
                    {!!categoryWithTypes &&
                        categoryWithTypes.types.map(type => {
                            return (
                                <label className='catalog__filter-checkbox' key={type.id}>
                                    <input type="checkbox" id="input"/>
                                    {/*[checked]="activeParams.types.includes(type.url)"*/}
                                    {/*(change)="updateFilterParam(type.url, input.checked)"*/}
                                    <span>{type.name}</span>
                                </label>
                            );
                        })
                    }
                    {!!type &&
                        <div className='catalog__filter-from-to'>
                            <span>от</span>
                            <input type="number" min="0" step="1" className='small-input'/>
                            {/*[ngModel]="from"*/}
                            {/*(ngModelChange)="updateFilterParamFromTo(type + 'From', $event)"*/}
                            <span>до</span>
                            <input type="number" min="0" step="1" className='small-input'/>
                            {/*[ngModel]="to"*/}
                            {/*(ngModelChange)="updateFilterParamFromTo(type + 'To', $event)"*/}
                            <span>см</span>
                        </div>
                    }
                </div>
            </div>
        );
    };

export default CategoryFilter;