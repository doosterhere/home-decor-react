import React from 'react';
import {Link} from "react-router-dom";

import {selectCategories} from "../../../store";

import {ROUTES} from "../../../constants";
import {useAppSelector} from "../../../hooks";
import {makeTypesQueryString} from "../../../utils";

const FooterCategory = () => {
    const {categories} = useAppSelector(selectCategories);

    return (
        <div className='footer-block category__footer-block'>
            <div className='footer-block__name'>Категории</div>
            <div className='footer-block__items'>
                <ul>
                    {
                        categories.map(category =>
                            <li key={category.id}>
                                <Link to={{
                                    pathname: ROUTES.CATALOG,
                                    search: makeTypesQueryString(category.types)
                                }}>
                                    {category.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default FooterCategory;