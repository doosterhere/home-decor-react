import React from 'react';

import './Info.scss';

import {config} from "../../../config/config";

const Info = () =>
    (
        <section className='info' id="info">
            <div className='container'>
                <div className='info__title'>Доставка и оплата</div>
                <div className='info__item info__delivery'>
                    <div className='info__image'>
                        <img src="/images/page/delivery.png" alt="delivery"/>
                    </div>
                    <div className='info__text'>
                        <div className='info__text-main'>
                            1. Доставка курьером (по г.&nbsp;Минску) - {config.deliveryCost} BYN
                        </div>
                        <div className='info__text-extra'>
                            На следующий день после оформления заказа
                        </div>
                    </div>
                    <div className='info__text'>
                        <div className='info__text-main'>
                            2. Самовывоз - 0 BYN
                        </div>
                        <div className='info__text-extra'>
                            Пункт выдачи товаров: г.&nbsp;Минск, ул.&nbsp;Калиновского 61, подъезд 1, офис 6
                        </div>
                    </div>
                </div>
                <div className='info__item info__payment'>
                    <div className='info__image'>
                        <img src="/images/page/payment.png" alt="payment"/>
                    </div>
                    <div className='info__text'>
                        <div className='info__text-main'>
                            1. Наличный расчет при получении
                        </div>
                    </div>
                    <div className='info__text'>
                        <div className='info__text-main'>
                            2. Безналичный расчет при получении
                        </div>
                    </div>
                    <div className='info__text'>
                        <div className='info__text-main'>
                            3. Оплата банковской картой в интернет-магазине
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

export default Info;