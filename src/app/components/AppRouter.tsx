import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {selectIsLogged} from "../store";
import {ROUTES} from "../constants";
import {useAppSelector} from "../hooks";

import Main from "../views/Main/Main";
import Header from "./Layouts/Header/Header";
import Footer from "./Layouts/Footer/Footer";
import Detail from "../views/Catalog/Detail/Detail";
import Catalog from "../views/Catalog/Catalog";
import Login from "../views/User/Login/Login";
import Terms from "../views/User/Terms/Terms";
import PageNotFound from "../views/PageNotFound/PageNotFound";

const AppRouter = () => {
    const isLogged = useAppSelector(selectIsLogged);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={ROUTES.HOME} element={<Main/>}/>
                <Route path={ROUTES.CATALOG} element={<Catalog/>}/>
                <Route path={`${ROUTES.PRODUCT}/:url`} element={<Detail/>}/>
                <Route path={ROUTES.SIGNUP} element={isLogged
                    ? <Navigate replace to={ROUTES.HOME}/>
                    : <Login/>}
                />
                <Route path={ROUTES.LOGIN} element={isLogged
                    ? <Navigate replace to={ROUTES.HOME}/>
                    : <Login/>}
                />
                <Route path={ROUTES.TERMS} element={<Terms/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default AppRouter;