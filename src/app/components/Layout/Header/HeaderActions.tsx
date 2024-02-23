import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Menu, MenuItem} from "@mui/material";

import {
    authApi,
    cartAPI,
    enqueueSuccessMessage,
    removeAccessToken,
    removeRefreshToken,
    selectCartCount,
    selectCartToSync,
    selectIsLogged,
    selectRefreshToken,
    setIsLogged,
    setUserHasBeenChanged
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
    const cartCount = useAppSelector(selectCartCount);
    const cartToSync = useAppSelector(selectCartToSync);
    const [clearCart] = cartAPI.useClearCartMutation();

    const handleUserClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handleLogoutClick = async () => {
        handleCloseClick();
        await logoutUser();
        const result = await clearAnonymousCart();

        if (result) {
            console.log('Корзина анонимного пользователя была очищена');
        }

        navigator(currentLocation);
    };

    const logoutUser = async () => {
        try {
            if (refreshToken) {
                await logout({refreshToken});
            }
        } catch (e) {
            console.warn(e);
        } finally {
            dispatcher(removeAccessToken());
            dispatcher(removeRefreshToken());
            dispatcher(setIsLogged(false));
            dispatcher(enqueueSuccessMessage('Вы вышли из системы'));
            dispatcher(setUserHasBeenChanged());
        }
    }

    const clearAnonymousCart = async () => {
        if (!cartToSync.items.length) {
            try {
                const response = await clearCart();

                if (response && 'data' in response) {
                    console.log(response.data.message);

                    return !response.data.error;
                }

                return false;
            } catch (e) {
                console.error(e);

                return false;
            }
        }

        return false;
    }

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
                <span>{cartCount}</span>
            </Link>
        </div>
    );
};

export default HeaderActions;