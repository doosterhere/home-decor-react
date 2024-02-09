import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Menu, MenuItem} from "@mui/material";

import {
    authApi,
    cartAPI,
    enqueueSuccessMessage,
    removeAccessToken,
    removeRefreshToken,
    selectCartCount,
    selectIsLogged,
    selectRefreshToken,
    setCartCount,
    setIsLogged
} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {ROUTES} from "../../../constants";

import {IconName} from "../../../types";

import {Icon} from "../../Icon/Icon";

const HeaderActions = () => {
    const isLogged = useAppSelector(selectIsLogged);
    const refreshToken = useAppSelector(selectRefreshToken);
    const [logout] = authApi.useLogoutMutation();
    const dispatcher = useAppDispatch();
    const navigator = useNavigate();
    const currentLocation = useLocation().pathname;
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLDivElement>(null);
    const isMenuOpened = Boolean(anchorMenuEl);
    const count = useAppSelector(selectCartCount);
    const {refetch: cartCountRefetch} = cartAPI.useGetCartCountQuery();

    useEffect(() => {
        async function reFetchCartCountData() {
            const result = await cartCountRefetch()
                .unwrap();

            if (result && 'count' in result) {
                dispatcher(setCartCount(result.count));
            } else {
                dispatcher(setCartCount(0));
            }
        }

        reFetchCartCountData().catch(fetchCartCountError => console.log(fetchCartCountError));
    }, [isLogged, dispatcher, cartCountRefetch]);

    const handleUserClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handleLogoutClick = async () => {
        handleCloseClick();

        try {
            if (refreshToken) {
                await logout({refreshToken});
            }
        } finally {
            dispatcher(removeAccessToken());
            dispatcher(removeRefreshToken());
            dispatcher(setIsLogged(false));
            dispatcher(enqueueSuccessMessage('Вы вышли из системы'));
            navigator(currentLocation);
        }
    };

    const handleProfileClick = () => {
        navigator(ROUTES.PROFILE);
        handleCloseClick();
    }

    const handleCloseClick = () => {
        setAnchorMenuEl(null);
    };

    return (
        <div className='header__top-actions'>
            {!isLogged &&
                <Link to={ROUTES.LOGIN}>
                    <Icon name={IconName.login}/>
                </Link>
            }
            {isLogged &&
                <div
                    id='user-button'
                    aria-controls={isMenuOpened ? 'user-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={isMenuOpened ? 'true' : undefined}
                    onClick={handleUserClick}
                >
                    <Icon name={IconName.profile}/>
                </div>
            }
            <Menu
                id='user-menu'
                open={isMenuOpened}
                anchorEl={anchorMenuEl}
                anchorOrigin={{
                    vertical: 30,
                    horizontal: 'left'
                }}
                onClose={handleCloseClick}
                disableAutoFocusItem={true}
            >
                <MenuItem
                    className="mat-mdc-menu-item"
                    onClick={handleProfileClick}
                >
                    Профиль
                </MenuItem>
                <MenuItem
                    className="mat-mdc-menu-item"
                    onClick={handleLogoutClick}
                >
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
    );
};

export default HeaderActions;