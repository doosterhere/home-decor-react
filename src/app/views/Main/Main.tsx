import React from 'react';

import 'swiper/css';
import './Main.scss';

import {useScrollToAnchor} from "../../hooks/useScrollToAnchor";

import MainOffers from "./MainOffers";
import MainBestProducts from "./MainBestProducts";
import MainInfo from "./MainInfo";
import MainReview from "./MainReview";
import MainMap from "./MainMap";

const Main = () => {

    const isLogged: boolean = false;

    useScrollToAnchor();

    return (
        <div>
            <section className='main'>
                <div className='container'>
                    <div className='main__title'>
                        Создадим сад <br/>
                        в вашем офисе
                    </div>
                    <div className='main__text'>
                        Если в большом городе вы скучаете по природе, ничто не мешает вам превратить в оазис квартиру
                        или офис. И мы поможем вам это сделать!
                    </div>
                </div>
            </section>
            <MainOffers/>
            <MainBestProducts isLogged={isLogged}/>
            <MainInfo/>
            <MainReview/>
            <MainMap/>
        </div>
    );
};

export default Main;