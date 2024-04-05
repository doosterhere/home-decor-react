import React from 'react';
import {Link} from "react-router-dom";

import {ROUTES} from "../../constants";

import {Button} from "../../components";

const MainOffers = () => (
    <section className='offers'>
        <div className='container'>
            <div className='offer offer-instagram'>
                <div className='offer__title'>Получи скидку 10% в нашем инстаграме!</div>
                <div className='offer__content'>
                    <div className='offer__image'>
                        <img src="/images/offer-01.png" alt="flower"/>
                    </div>
                    <div>
                        <div className='offer__text'>
                            Подпишись на наш аккаунт и напиши в direct “хочу промокод”
                        </div>
                        <div className='offer__button'>
                            <Button
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Получить промокод
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='offer offer-collection'>
                <div className='offer__title'>Новая коллекция керамических кашпо в наличии</div>
                <div className='offer__content'>
                    <div className='offer__image'>
                        <img src="/images/offer-02.png" alt="flower"/>
                    </div>
                    <div className='offer__button'>
                        <Link to={ROUTES.CATALOG} className='button'>В каталог</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default MainOffers;