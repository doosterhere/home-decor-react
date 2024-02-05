import React, {lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {selectIsLogged} from "../store";
import {ROUTES} from "../constants";
import {useAppSelector} from "../hooks";

import {Layout} from "../components";

const Main = lazy(() => import('../pages/Main/Main'));
const Catalog = lazy(() => import('../pages/Catalog/Catalog'));
const Detail = lazy(() => import('../pages/Catalog/Detail/Detail'));
const Login = lazy(() => import('../pages/User/Login/Login'));
const Terms = lazy(() => import('../pages/User/Terms/Terms'));
const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'));

export const AppRouter = () => {
    const isLogged = useAppSelector(selectIsLogged);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path={ROUTES.CATALOG} element={<Catalog/>}/>
                    <Route path={`${ROUTES.PRODUCT}/:url`} element={<Detail/>}/>
                    <Route path={ROUTES.SIGNUP}
                           element={isLogged
                               ? <Navigate to={ROUTES.HOME}/>
                               : <Login/>
                           }
                    />
                    <Route path={ROUTES.LOGIN}
                           element={isLogged
                               ? <Navigate to={ROUTES.HOME}/>
                               : <Login/>
                           }
                    />
                    <Route path={ROUTES.TERMS} element={<Terms/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}