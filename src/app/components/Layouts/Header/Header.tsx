import React, {useEffect, useState} from 'react';

import './Header.scss';

import {useSetCategories} from "../../../hooks";

import Logo from "../../Logo/Logo";
import HeaderTopMenu from "./HeaderTopMenu";
import HeaderActions from "./HeaderActions";
import HeaderBottomMenu from "./HeaderBottomMenu";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));

        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
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
        if (screenWidth < 1024) {
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
                            screenWidth={screenWidth}
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

export default Header;