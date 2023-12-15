import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {ROUTES} from "../constants/constants";

import Main from "../views/Main/Main";
import Header from "./Layouts/Header/Header";
import Footer from "./Layouts/Footer/Footer";
import Detail from "../views/Catalog/Detail/Detail";
import Catalog from "../views/Catalog/Catalog";

const AppRouter = () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path={ROUTES.HOME} element={<Main/>}/>
            <Route path={ROUTES.CATALOG} element={<Catalog/>}/>
            <Route path={`${ROUTES.PRODUCT}/:url`} element={<Detail/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
);

export default AppRouter;