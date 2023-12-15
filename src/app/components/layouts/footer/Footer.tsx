import React from 'react';
import {Link} from "react-router-dom";

import "./Footer.scss";

import {ROUTES, MENU} from "../../../constants/constants";

import {useAppSelector} from "../../../hooks/redux";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

import {IconName} from "../../../types/icon-name.type";

import Icon from "../../Icon/Icon";

const Footer = () => {
    const {categories} = useAppSelector(state => state.category);

    return (
        <footer className='footer'>
            <div className='container'>
                <Link to={ROUTES.HOME} className='logo'>
                    <img src='/images/logo-green.png' alt="logo"/>
                </Link>
                <div className='footer-block menu__footer-block'>
                    <div className='footer-block__name'>Меню</div>
                    <nav className='footer-block__items'>
                        <ul>
                            {
                                MENU.map(item => {
                                    return (
                                        <li key={item.name}>
                                            <Link to={item.link}>{item.name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>

                <div className='footer-block category__footer-block'>
                    <div className='footer-block__name'>Категории</div>
                    <div className='footer-block__items'>
                        <ul>
                            {
                                categories.map(category =>
                                    <li key={category.id}>
                                        <Link to={{
                                            pathname: ROUTES.CATALOG,
                                            search: makeTypesQueryString(category.types)
                                        }}>
                                            {category.name}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <div className='footer-block info__footer-block'>
                    <div className='footer-block__name'>Мы в социальных сетях</div>
                    <div className='footer-block__social'>
                        <a href="https://vk.com/" target="_blank" rel="noreferrer">
                            <Icon name={IconName.vk} needHover={true}/>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <Icon name={IconName.fb} needHover={true}/>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <Icon name={IconName.instagram} needHover={true}/>
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

                <div className='footer-block contacts__footer-block'>
                    <div className='footer-block__name'>Контакты</div>
                    <div className='footer-block__contact'>
                        <div className='footer-block__contact-head'>Адрес</div>
                        <div className='footer-block__contact-info'>
                            г. Минск, ул. Калиновского 61, подъезд 1, офис 6
                        </div>
                    </div>

                    <div className='footer-block__contact'>
                        <div className='footer-block__contact-head'>Телефон</div>
                        <div className='footer-block__contact-info'>
                            <Link to='tel: +375299222999'>+ 375 (29) 922-29-99</Link>
                        </div>
                    </div>

                    <div className='footer-block__contact'>
                        <div className='footer-block__contact-head'>E-mail</div>
                        <div className='footer-block__contact-info'>
                            <Link to='mailto: homedecor@gmail.com'>homedecor@gmail.com</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;