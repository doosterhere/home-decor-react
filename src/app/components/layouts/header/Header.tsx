import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Menu, MenuItem} from "@mui/material";

import './Header.scss';

import {ROUTES, MENU} from "../../../constants/constants";

import {useAppSelector} from "../../../hooks/redux";
import {useSetCategories} from "../../../hooks/useSetCategories";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

import {IconName} from "../../../types/icon-name.type";

import Icon from "../../Icon/Icon";

const Header = () => {
    const {categories} = useAppSelector(state => state.category);
    const [count, setCount] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const navigator = useNavigate();

    const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenuEl);

    const handleUserClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleClose();
    };

    const handleProfile = () => {
        navigator(ROUTES.PROFILE);
        handleClose();
    }

    const handleClose = () => {
        setAnchorMenuEl(null);
    };

    useSetCategories();

    return (
        <header className='header'>
            <div className='container'>
                <Link to={ROUTES.HOME} className='logo'>
                    <img src="/images/logo.png" alt="logo"/>
                </Link>
                <div className='header__content'>
                    <div className='header__top'>
                        <div className='header__top-menu'>
                            <nav>
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
                        <Link to="tel:+375299182888" className='header__top-phone'>+ 375 (29) 918-28-88</Link>
                        <div className='header__top-actions'>
                            {!isLogged &&
                                <Link to={ROUTES.LOGIN}>
                                    <Icon name={IconName.login}/>
                                </Link>
                            }
                            {isLogged &&
                                <a
                                    id='user-button'
                                    aria-controls={open ? 'user-menu' : undefined}
                                    aria-haspopup='true'
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleUserClick}
                                >
                                    <Icon name={IconName.profile}/>
                                </a>
                            }
                            <Menu
                                id='user-menu'
                                open={open}
                                anchorEl={anchorMenuEl}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'user-button',
                                }}
                            >
                                <MenuItem className="mat-mdc-menu-item" onClick={handleProfile}>
                                    Профиль
                                </MenuItem>
                                <MenuItem className="mat-mdc-menu-item" onClick={handleLogout}>
                                    Выйти
                                </MenuItem>
                            </Menu>
                            {isLogged &&
                                <Link to={ROUTES.FAVORITES}>
                                    <Icon name={IconName.heartBig}/>
                                </Link>
                            }
                            <Link to={ROUTES.CART}>
                                <Icon name={IconName.cart}/>
                                <span>{count}</span>
                            </Link>
                        </div>
                    </div>
                    <div className='header__bottom'>
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
                        <div className='header__bottom-search'>
                            <input type="text" name="search" placeholder="Начните искать"/>
                            {/*<div className="search-result" *ngIf="showedSearchResult && searchResult && searchResult.length">*/}
                            {/* <div className="search-result__item" *ngFor="let item of searchResult" (click)="foundProductClick(item.url)">*/}
                            {/*     <div className="search-result__item-image" style="background-image: url('{{serverStaticPath + item.image}}')"></div>*/}
                            {/*     <div className="search-result__item-name">{{item.name}}</div>*/}
                            {/* </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;