import React from 'react';
import {Link} from "react-router-dom";

import {ROUTES} from "../../../constants/constants";
import {useAppSelector} from "../../../hooks/redux";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

const HeaderBottomMenu = () => {
    const {categories} = useAppSelector(state => state.category);

    return (
        <div className='header__bottom-menu'>
            <nav>
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
            </nav>
        </div>
    );
};

export default HeaderBottomMenu;