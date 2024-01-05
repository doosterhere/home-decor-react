import React from 'react';
import {Link} from "react-router-dom";

import {ROUTES} from "../../../constants/constants";
import {useAppSelector} from "../../../hooks/redux";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

const FooterCategory = () => {
    const {categories} = useAppSelector(state => state.category);

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