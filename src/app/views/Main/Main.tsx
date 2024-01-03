import React from 'react';

import 'swiper/css';
import './Main.scss';

import {useScrollToAnchor} from "../../hooks/useScrollToAnchor";

import Offers from "./Offers/Offers";
import Info from "./Info/Info";
import Review from "./Review/Review";
import BestProducts from "./BestProducts/BestProducts";
import Map from "./Map/Map";

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
            <Offers/>
            <BestProducts isLogged={isLogged}/>
            <Info/>
            <Review/>
            <Map/>
        </div>
    );
};

export default Main;