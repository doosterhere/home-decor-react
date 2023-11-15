import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Menu, MenuItem} from "@mui/material";

import "./Header.scss";

import {useAppSelector} from "../../../hooks/redux";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

const Header = () => {
    const {categories, error} = useAppSelector(state => state.category);
    const [count, setCount] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const navigator = useNavigate();

    const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenuEl);
    const handleUserClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };
    const handleLogout = () => {
        console.log('logging out...');
        handleClose();
    };

    const handleProfile = () => {
        navigator('/profile');
        handleClose();
    }

    const handleClose = () => {
        setAnchorMenuEl(null);
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/images/logo.png" alt="logo"/>
                </Link>
                <div className="header__content">
                    <div className="header__top">
                        <div className="header__top-menu">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">Главная</Link>
                                    </li>
                                    <li>
                                        <Link to="/catalog">Каталог</Link>
                                    </li>
                                    <li>
                                        <Link to="/#reviews">Отзывы</Link>
                                    </li>
                                    <li>
                                        <Link to="/#delivery">Доставка и оплата</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <Link to="tel:+375299182888" className="header__top-phone">+ 375 (29) 918-28-88</Link>
                        <div className="header__top-actions">
                            {!isLogged &&
                                <Link to="/login">
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.5293 7.24498C8.82638 3.79498 10.5993 2.38623 14.4805 2.38623H14.6051C18.8889 2.38623 20.6043 4.10165 20.6043 8.3854V14.6337C20.6043 18.9175 18.8889 20.6329 14.6051 20.6329H14.4805C10.628 20.6329 8.85513 19.2433 8.53888 15.8508"
                                            stroke="#202B21" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                        <path d="M1.91699 11.5H14.2603" stroke="#202B21" strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12.123 8.28955L15.3335 11.5L12.123 14.7104" stroke="#202B21"
                                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
                                            stroke="#202B21" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                        <path
                                            d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                                            stroke="#202B21" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="#202B21" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
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
                                <MenuItem className='mat-mdc-menu-item' onClick={handleProfile}>
                                    Профиль
                                </MenuItem>
                                <MenuItem className='mat-mdc-menu-item' onClick={handleLogout}>
                                    Выйти
                                </MenuItem>
                            </Menu>
                            {isLogged &&
                                <Link to="/favorites">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9997 20.846C11.7155 20.846 11.4405 20.8093 11.2113 20.7268C7.70967 19.526 2.14551 15.2635 2.14551 8.96596C2.14551 5.75763 4.73967 3.1543 7.92967 3.1543C9.47884 3.1543 10.9272 3.7593 11.9997 4.84096C13.0722 3.7593 14.5205 3.1543 16.0697 3.1543C19.2597 3.1543 21.8538 5.7668 21.8538 8.96596C21.8538 15.2726 16.2897 19.526 12.788 20.7268C12.5588 20.8093 12.2838 20.846 11.9997 20.846ZM7.92967 4.5293C5.50051 4.5293 3.52051 6.51846 3.52051 8.96596C3.52051 15.2268 9.54301 18.7101 11.6605 19.4343C11.8255 19.4893 12.183 19.4893 12.348 19.4343C14.4563 18.7101 20.488 15.236 20.488 8.96596C20.488 6.51846 18.508 4.5293 16.0788 4.5293C14.6855 4.5293 13.393 5.18013 12.5588 6.30763C12.3022 6.65596 11.7155 6.65596 11.4588 6.30763C10.6063 5.17096 9.32301 4.5293 7.92967 4.5293Z"
                                            fill="#202B21"/>
                                    </svg>
                                </Link>
                            }
                            <Link to="/cart">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.32507 7.31686C6.16673 7.31686 6.00007 7.2502 5.8834 7.13353C5.64173 6.89186 5.64173 6.49186 5.8834 6.2502L8.9084 3.2252C9.15007 2.98353 9.55007 2.98353 9.79173 3.2252C10.0334 3.46686 10.0334 3.86686 9.79173 4.10853L6.76673 7.13353C6.64173 7.2502 6.4834 7.31686 6.32507 7.31686Z"
                                        fill="#202B21"/>
                                    <path
                                        d="M17.6753 7.31686C17.5169 7.31686 17.3586 7.25853 17.2336 7.13353L14.2086 4.10853C13.9669 3.86686 13.9669 3.46686 14.2086 3.2252C14.4503 2.98353 14.8503 2.98353 15.0919 3.2252L18.1169 6.2502C18.3586 6.49186 18.3586 6.89186 18.1169 7.13353C18.0003 7.2502 17.8336 7.31686 17.6753 7.31686Z"
                                        fill="#202B21"/>
                                    <path
                                        d="M18.842 10.8333C18.7837 10.8333 18.7253 10.8333 18.667 10.8333H18.4753H5.33366C4.75033 10.8417 4.08366 10.8417 3.60033 10.3583C3.21699 9.98333 3.04199 9.4 3.04199 8.54167C3.04199 6.25 4.71699 6.25 5.51699 6.25H18.4837C19.2837 6.25 20.9587 6.25 20.9587 8.54167C20.9587 9.40833 20.7837 9.98333 20.4003 10.3583C19.967 10.7917 19.3837 10.8333 18.842 10.8333ZM5.51699 9.58333H18.6753C19.0503 9.59167 19.4003 9.59167 19.517 9.475C19.5753 9.41667 19.7003 9.21667 19.7003 8.54167C19.7003 7.6 19.467 7.5 18.4753 7.5H5.51699C4.52533 7.5 4.29199 7.6 4.29199 8.54167C4.29199 9.21667 4.42533 9.41667 4.47533 9.475C4.59199 9.58333 4.95033 9.58333 5.31699 9.58333H5.51699Z"
                                        fill="#202B21"/>
                                    <path
                                        d="M10.1338 17.2498C9.79212 17.2498 9.50879 16.9665 9.50879 16.6248V13.6665C9.50879 13.3248 9.79212 13.0415 10.1338 13.0415C10.4755 13.0415 10.7588 13.3248 10.7588 13.6665V16.6248C10.7588 16.9748 10.4755 17.2498 10.1338 17.2498Z"
                                        fill="#202B21"/>
                                    <path
                                        d="M13.9668 17.2498C13.6251 17.2498 13.3418 16.9665 13.3418 16.6248V13.6665C13.3418 13.3248 13.6251 13.0415 13.9668 13.0415C14.3085 13.0415 14.5918 13.3248 14.5918 13.6665V16.6248C14.5918 16.9748 14.3085 17.2498 13.9668 17.2498Z"
                                        fill="#202B21"/>
                                    <path
                                        d="M14.4083 20.9581H9.38329C6.39996 20.9581 5.73329 19.1831 5.47496 17.6415L4.29996 10.4331C4.24162 10.0915 4.47496 9.7748 4.81662 9.71646C5.15829 9.65813 5.47496 9.89146 5.53329 10.2331L6.70829 17.4331C6.94996 18.9081 7.44996 19.7081 9.38329 19.7081H14.4083C16.55 19.7081 16.7916 18.9581 17.0666 17.5081L18.4666 10.2165C18.5333 9.87479 18.8583 9.6498 19.2 9.7248C19.5416 9.79146 19.7583 10.1165 19.6916 10.4581L18.2916 17.7498C17.9666 19.4415 17.425 20.9581 14.4083 20.9581Z"
                                        fill="#202B21"/>
                                </svg>
                                <span>{count}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="header__bottom">
                        <div className="header__bottom-menu">
                            <nav>
                                <ul>
                                    {!error &&
                                        categories.map(category =>
                                            <li key={category.id}>
                                                <Link to={{
                                                    pathname: '/catalog',
                                                    search: makeTypesQueryString(category.types)
                                                }}>{category.name}</Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className="header__bottom-search">
                            <input type="text" placeholder="Начните искать"/>
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