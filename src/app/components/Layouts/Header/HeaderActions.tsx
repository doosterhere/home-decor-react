import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Menu, MenuItem} from "@mui/material";

import {ROUTES} from "../../../constants/constants";

import {IconName} from "../../../types/icon-name.type";

import Icon from "../../Icon/Icon";

const HeaderActions = () => {
    let isLogged = true;
    const [count, setCount] = useState(0);
    const navigator = useNavigate();
    const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLDivElement>(null);
    const isMenuOpened = Boolean(anchorMenuEl);

    const handleUserClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handleLogoutClick = () => {
        //logout code
        handleCloseClick();
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