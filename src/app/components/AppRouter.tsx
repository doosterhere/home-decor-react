import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {selectIsLogged} from "../store";
import {ROUTES} from "../constants";
import {useAppSelector} from "../hooks";

import {Footer, Header} from "../components";
import {Main, Catalog, Detail, Login, PageNotFound, Terms} from "../views";

export const AppRouter = () => {
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