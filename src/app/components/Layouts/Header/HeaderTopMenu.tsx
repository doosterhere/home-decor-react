import React, {FC} from 'react';
import {Link} from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {MENU} from "../../../constants";

interface ITopMenu {
    isMenuVisible: boolean;
    toggleMenuVisibility: () => void;
    screenWidth: number;
}

const HeaderTopMenu: FC<ITopMenu> =
    ({
         isMenuVisible,
         toggleMenuVisibility,
         screenWidth
     }) => {
        return (
            <>
                <div className="header__top-mobile-menu-button"
                     onClick={toggleMenuVisibility}
                >
                    <MenuIcon
                        style={{
                            'display': screenWidth > 1023 || (screenWidth <= 1023 && isMenuVisible)
                                ? 'none' : 'block'
                        }}
                    />
                </div>
                <div className='header__top-menu'
                     style={{
                         'display': screenWidth > 1023 || (screenWidth <= 1023 && isMenuVisible)
                             ? 'block' : 'none'
                     }}
                >
                    <nav>
                        <div className="header__top-menu-cross"
                             onClick={toggleMenuVisibility}
                        >
                            <CloseIcon/>
                        </div>
                        <ul>
                            {
                                MENU.map(item => {
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                to={item.link}
                                                onClick={toggleMenuVisibility}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
                <Link to="tel:+375299182888" className='header__top-phone'>+ 375 (29) 918-28-88</Link>
            </>
        );
    };

export default HeaderTopMenu;