import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../views/main/Main";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default AppRouter;