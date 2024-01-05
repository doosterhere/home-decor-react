import React from 'react';
import {Link} from "react-router-dom";

import {MENU} from "../../../constants/constants";

const FooterMenu = () => {
    return (
        <div className='footer-block menu__footer-block'>
            <div className='footer-block__name'>Меню</div>
            <nav className='footer-block__items'>
                <ul>
                    {
                        MENU.map(item => {
                            return (
                                <li key={item.name}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    );
};

export default FooterMenu;