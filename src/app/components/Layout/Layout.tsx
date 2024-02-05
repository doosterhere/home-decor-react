import React, {Suspense} from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Loader} from "../Loader/Loader";

export const Layout = () => {
    return (
        <>
            <Header/>
            <div>
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
        </>
    );
};