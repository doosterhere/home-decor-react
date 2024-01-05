import React from 'react';

import {IconName} from "../../../types/icon-name.type";

import Icon from "../../Icon/Icon";

const FooterInfo = () => {
    return (
        <div className='footer-block info__footer-block'>
            <div className='footer-block__name'>Мы в социальных сетях</div>
            <div className='footer-block__social'>
                <a href="https://vk.com/" target="_blank" rel="noreferrer">
                    <Icon name={IconName.vk} needHover/>
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <Icon name={IconName.fb} needHover/>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <Icon name={IconName.instagram} needHover/>
                </a>
            </div>
            <div className='footer-block__payment'>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-01.png)"}}></div>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-02.png)"}}></div>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-03.png)"}}></div>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-04.png)"}}></div>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-05.png)"}}></div>
                <div className='payment-item'
                     style={{backgroundImage: "url(/images/payment-06.png)"}}></div>
            </div>
        </div>
    );
};

export default FooterInfo;