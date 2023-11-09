import React from 'react';
import {Link} from "react-router-dom";

import "./Footer.scss";

import {useAppSelector} from "../../../hooks/redux";
import makeTypesQueryString from "../../../utils/makeTypesQueryString";

const Footer = () => {
    const {categories, error} = useAppSelector(state => state.category);

    return (
        <footer className="footer">
            <div className="container">
                <Link to="/" className="logo">
                    <img src='/images/logo-green.png' alt="logo"/>
                </Link>
                <div className="footer-block menu__footer-block">
                    <div className="footer-block__name">Меню</div>
                    <nav className="footer-block__items">
                        <ul>
                            <li>
                                <Link to='/'>Главная</Link>
                            </li>
                            <li>
                                <Link to='/catalog'>Каталог</Link>
                            </li>
                            <li>
                                <Link to='/#delivery'>Доставка и оплата</Link>
                            </li>
                            {/*<li>*/}
                            {/*    <a>Новости</a>*/}
                            {/*</li>*/}
                            <li>
                                <Link to='/#reviews'>Отзывы</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="footer-block category__footer-block">
                    <div className="footer-block__name">Категории</div>
                    <div className="footer-block__items">
                        <ul>
                            {!error &&
                                categories.map(category =>
                                    <li key={category.id}>
                                        <Link to={{
                                            pathname: '/catalog',
                                            search: makeTypesQueryString(category.types)
                                        }}>{category.name}</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <div className="footer-block info__footer-block">
                    <div className="footer-block__name">Мы в социальных сетях</div>
                    <div className="footer-block__social">
                        <a href="https://vk.com/" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.81152 3.74976C5.12988 3.74976 3.75 5.12964 3.75 6.81128V17.1882C3.75 18.8699 5.12988 20.2498 6.81152 20.2498H17.1885C18.8701 20.2498 20.25 18.8699 20.25 17.1882V6.81128C20.25 5.12964 18.8701 3.74976 17.1885 3.74976H6.81152ZM6.81152 5.24976H17.1885C18.0586 5.24976 18.75 5.94116 18.75 6.81128V17.1882C18.75 18.0583 18.0586 18.7498 17.1885 18.7498H6.81152C5.94141 18.7498 5.25 18.0583 5.25 17.1882V6.81128C5.25 5.94116 5.94141 5.24976 6.81152 5.24976ZM11.7891 9.17261C11.2383 9.16675 10.7695 9.17261 10.5059 9.30151C10.3301 9.38647 10.1953 9.57983 10.2773 9.58862C10.3799 9.60327 10.6113 9.65308 10.7344 9.82007C10.8926 10.0339 10.8867 10.5173 10.8867 10.5173C10.8867 10.5173 10.9746 11.8474 10.6729 12.0144C10.4648 12.1287 10.1807 11.8972 9.56543 10.8396C9.25195 10.2947 9.01465 9.69409 9.01465 9.69409C9.01465 9.69409 8.9707 9.58276 8.88867 9.52417C8.78906 9.45093 8.65137 9.42749 8.65137 9.42749L7.18359 9.43628C7.18359 9.43628 6.96387 9.44507 6.88477 9.53882C6.81152 9.62671 6.87891 9.79956 6.87891 9.79956C6.87891 9.79956 8.02734 12.4861 9.32812 13.8396C10.5205 15.0818 11.874 14.9998 11.874 14.9998H12.4893C12.4893 14.9998 12.6738 14.9792 12.7676 14.8796C12.8555 14.7859 12.8525 14.6101 12.8525 14.6101C12.8525 14.6101 12.8408 13.7869 13.2217 13.6638C13.5996 13.5466 14.0801 14.4607 14.5928 14.8123C14.9824 15.0789 15.2783 15.0203 15.2783 15.0203L16.6494 14.9998C16.6494 14.9998 17.3643 14.9558 17.0244 14.3904C16.998 14.3464 16.8281 13.9744 16.0078 13.2126C15.1465 12.4158 15.2607 12.5447 16.2979 11.1648C16.9277 10.324 17.1797 9.81128 17.1006 9.58862C17.0244 9.38062 16.5615 9.43628 16.5615 9.43628L15.0176 9.44507C15.0176 9.44507 14.9033 9.43042 14.8184 9.48022C14.7363 9.53003 14.6836 9.64722 14.6836 9.64722C14.6836 9.64722 14.4375 10.2976 14.1123 10.8513C13.4268 12.0173 13.1484 12.0818 13.0371 12.0085C12.7764 11.8386 12.8408 11.3289 12.8408 10.9685C12.8408 9.83472 13.0137 9.36597 12.5068 9.24292C12.3398 9.2019 12.2168 9.17554 11.7891 9.17261Z"
                                    fill="#2C2C2C"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 3.00031C7.03832 3.00031 3 7.03863 3 12.0003C3 16.962 7.03832 21.0003 12 21.0003C16.9617 21.0003 21 16.962 21 12.0003C21 7.03863 16.9617 3.00031 12 3.00031ZM12 4.50031C16.151 4.50031 19.5 7.84929 19.5 12.0003C19.5 15.7708 16.7338 18.8713 13.1162 19.4095V14.1873H15.252L15.5874 12.0179H13.1162V10.8328C13.1162 9.93207 13.4121 9.13214 14.2544 9.13214H15.6079V7.23956C15.3702 7.20731 14.867 7.13702 13.916 7.13702C11.93 7.13702 10.7666 8.18551 10.7666 10.575V12.0179H8.72461V14.1873H10.7666V19.3904C7.20664 18.8033 4.5 15.7301 4.5 12.0003C4.5 7.84929 7.84898 4.50031 12 4.50031Z"
                                    fill="#2C2C2C"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.60156 3.74976C5.93848 3.74976 3.75 5.9353 3.75 8.60132V15.3982C3.75 18.0613 5.93555 20.2498 8.60156 20.2498H15.3984C18.0615 20.2498 20.25 18.0642 20.25 15.3982V8.60132C20.25 5.93823 18.0645 3.74976 15.3984 3.74976H8.60156ZM8.60156 5.24976H15.3984C17.2529 5.24976 18.75 6.74683 18.75 8.60132V15.3982C18.75 17.2527 17.2529 18.7498 15.3984 18.7498H8.60156C6.74707 18.7498 5.25 17.2527 5.25 15.3982V8.60132C5.25 6.74683 6.74707 5.24976 8.60156 5.24976ZM16.4297 6.89038C16.0518 6.89038 15.75 7.19214 15.75 7.57007C15.75 7.948 16.0518 8.24976 16.4297 8.24976C16.8076 8.24976 17.1094 7.948 17.1094 7.57007C17.1094 7.19214 16.8076 6.89038 16.4297 6.89038ZM12 7.49976C9.52441 7.49976 7.5 9.52417 7.5 11.9998C7.5 14.4753 9.52441 16.4998 12 16.4998C14.4756 16.4998 16.5 14.4753 16.5 11.9998C16.5 9.52417 14.4756 7.49976 12 7.49976ZM12 8.99976C13.667 8.99976 15 10.3328 15 11.9998C15 13.6667 13.667 14.9998 12 14.9998C10.333 14.9998 9 13.6667 9 11.9998C9 10.3328 10.333 8.99976 12 8.99976Z"
                                    fill="#2C2C2C"/>
                            </svg>
                        </a>
                    </div>
                    <div className="footer-block__payment">
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-01.png)"}}></div>
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-02.png)"}}></div>
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-03.png)"}}></div>
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-04.png)"}}></div>
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-05.png)"}}></div>
                        <div className="payment-item"
                             style={{backgroundImage: "url(/images/payment-06.png)"}}></div>
                    </div>
                </div>

                <div className="footer-block contacts__footer-block">
                    <div className="footer-block__name">Контакты</div>
                    <div className="footer-block__contact">
                        <div className="footer-block__contact-head">Адрес</div>
                        <div className="footer-block__contact-info">
                            г. Минск, ул. Калиновского 61, подъезд 1, офис 6
                        </div>
                    </div>

                    <div className="footer-block__contact">
                        <div className="footer-block__contact-head">Телефон</div>
                        <div className="footer-block__contact-info">
                            <Link to='tel: +375299222999'>+ 375 (29) 922-29-99</Link>
                        </div>
                    </div>

                    <div className="footer-block__contact">
                        <div className="footer-block__contact-head">E-mail</div>
                        <div className="footer-block__contact-info">
                            <Link to='mailto: homedecor@gmail.com'>homedecor@gmail.com</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;