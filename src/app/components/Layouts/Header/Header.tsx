import React, {useEffect, useState} from 'react';

import './Header.scss';

import {useSetCategories} from "../../../hooks";
import {BURGER_POINT} from "../../../constants";

import {Logo} from "../../Logo/Logo";
import HeaderTopMenu from "./HeaderTopMenu";
import HeaderActions from "./HeaderActions";
import HeaderBottomMenu from "./HeaderBottomMenu";
import HeaderSearch from "./HeaderSearch";

export const Header = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        setIsDesktop(matchMedia(`screen and (min-width: ${BURGER_POINT}px)`).matches);
        window.addEventListener('resize', () =>
            setIsDesktop(matchMedia(`screen and (min-width: ${BURGER_POINT}px)`).matches));

        return () => {
            window.removeEventListener('resize', () =>
                setIsDesktop(matchMedia(`screen and (min-width: ${BURGER_POINT}px)`).matches));
        }
    }, []);

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
                            isDesktop={isDesktop}
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