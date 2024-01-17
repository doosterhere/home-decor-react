import React from 'react';
import {Link} from "react-router-dom";

import {selectCategories} from "../../../store";

import {ROUTES} from "../../../constants";
import {useAppSelector} from "../../../hooks";
import {makeTypesQueryString} from "../../../utils";

const HeaderBottomMenu = () => {
    const {categories} = useAppSelector(selectCategories);

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