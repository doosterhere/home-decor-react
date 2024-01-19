import React, {useEffect, useState} from 'react';

import './Header.scss';

import {useMatchMedia, useSetCategories} from "../../../hooks";

import {Logo} from "../../Logo/Logo";
import HeaderTopMenu from "./HeaderTopMenu";
import HeaderActions from "./HeaderActions";
import HeaderBottomMenu from "./HeaderBottomMenu";
import HeaderSearch from "./HeaderSearch";

export const Header = () => {
    const {isDesktop} = useMatchMedia();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        if (isMenuVisible) {
            disableScroll();
            return;
        }

        enableScroll();
    }, [isMenuVisible]);

    const toggleMenuVisibility = () => {
        if (!isDesktop) {
            setIsMenuVisible(current => !current);
        }
    };

    const disableScroll = () => {
        const scrollTop: number = document.documentElement.scrollTop;
        const scrollLeft: number = document.documentElement.scrollLeft;

        window.onscroll = function (): void {
            window.scrollTo(scrollLeft, scrollTop);
        }
    }

    const enableScroll = () => {
        window.onscroll = function (): void {
        };
    }

    useSetCategories();

    return (
        <header className='header'>
            <div className='container'>
                <Logo className='logo'/>
                <div className='header__content'>
                    <div className='header__top'>
                        <HeaderTopMenu
                            isMenuVisible={isMenuVisible}
                            toggleMenuVisibility={toggleMenuVisibility}
                        />
                        <HeaderActions/>
                    </div>

                    <div className='header__bottom'>
                        <HeaderBottomMenu/>
                        <HeaderSearch/>
                    </div>
                </div>
            </div>
        </header>
    );
};