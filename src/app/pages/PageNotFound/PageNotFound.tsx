import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';

import './PageNotFound.scss';

import {ROUTES} from "../../constants";

const PageNotFound = () => {
    const navigator = useNavigate();

    const handlerBack = (e: React.MouseEvent<HTMLAnchorElement | MouseEvent>) => {
        e.preventDefault();
        navigator(-1);
    }

    return (
        <div className="page-not-found">
            <div className="container">
                <div> Такой страницы не существует...</div>
                <div className='links'>
                    <Link to='/' onClick={(e) => handlerBack(e)}>
                        <ArrowBackRounded color='disabled'/>
                        Назад
                    </Link>
                    <Link to={ROUTES.HOME}>
                        <HomeRounded color='disabled'/>
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;