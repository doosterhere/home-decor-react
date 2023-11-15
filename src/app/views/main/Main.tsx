import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import './Main.scss';

import {productAPI} from "../../store/services/productService";
import {config} from "../../config/config";
import ProductCard from "../../components/product-card/ProductCard";
import {useScrollToAnchor} from "../../hooks/useScrollToAnchor";

const Main = () => {
    const reviews: { id: number, name: string, image: string, text: string }[] = config.reviews;
    const {data: bestProducts} = productAPI.useGetBestProductsQuery();
    const deliveryCost: number = config.deliveryCost;
    const isLogged: boolean = false;
    const swiperBestRef = useRef<SwiperRef>(null);
    const swiperReviewRef = useRef<SwiperRef>(null);
    const [bestBackwardEnabled, setBestBackwardEnabled] = useState(false);
    const [bestForwardEnabled, setBestForwardEnabled] = useState(true);

    useScrollToAnchor();

    const handleBestPrevSlide = () => {
        if (!bestBackwardEnabled) {
            return;
        }

        setBestForwardEnabled(true);
        swiperBestRef?.current?.swiper?.slidePrev();

        const leftSlideIndex = swiperBestRef?.current?.swiper?.realIndex;
        if (!leftSlideIndex) {
            setBestBackwardEnabled(false);
        }
    }

    const handleBestNextSlide = () => {
        if (!bestForwardEnabled) {
            return;
        }

        setBestBackwardEnabled(true);
        swiperBestRef?.current?.swiper?.slideNext();

        const slidesPerView = swiperBestRef?.current?.swiper?.params.slidesPerView;
        const leftSlideIndex = swiperBestRef?.current?.swiper?.realIndex;
        const slidesLength = swiperBestRef?.current?.swiper?.slides.length;

        if (leftSlideIndex + slidesPerView === slidesLength) {
            setBestForwardEnabled(false);
        }
    }

    const handleReviewPrevSlide = () => {
        swiperReviewRef?.current?.swiper?.slidePrev();
    };

    const handleReviewNextSlide = () => {
        swiperReviewRef?.current?.swiper?.slideNext();
    };

    return (
        <div>
            <section className="main">
                <div className="container">
                    <div className="main__title">
                        Создадим сад <br/>
                        в вашем офисе
                    </div>
                    <div className="main__text">
                        Если в большом городе вы скучаете по природе, ничто не мешает вам превратить в оазис квартиру
                        или офис. И мы
                        поможем вам это сделать!
                    </div>
                </div>
            </section>

            <section className="offers">
                <div className="container">
                    <div className="offer offer-instagram">
                        <div className="offer__title">Получи скидку 10% в нашем инстаграме!</div>
                        <div className="offer__content">
                            <div className="offer__image">
                                <img src="/images/offer-01.png" alt="flower"/>
                            </div>
                            <div className="offer__inner-content">
                                <div className="offer__text">
                                    Подпишись на наш аккаунт и напиши в direct “хочу промокод”
                                </div>
                                <div className="offer__button">
                                    <a href="https://www.instagram.com"
                                       target="_blank"
                                       rel="noreferrer"
                                       className="button"
                                    >
                                        Получить промокод
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offer offer-collection">
                        <div className="offer__title">Новая коллекция керамических кашпо в наличии</div>
                        <div className="offer__content">
                            <div className="offer__image">
                                <img src="/images/offer-02.png" alt="flower"/>
                            </div>
                            <div className="offer__button">
                                <Link to="/catalog" className="button">В каталог</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="best-products">
                <div className="container">
                    <div className="carousel__header">
                        <div className="carousel__title">Лучшие предложения месяца</div>
                        <div className="carousel__arrows">
                            <a className={!bestBackwardEnabled ? "move-backward inactive" : "move-backward"}
                               onClick={handleBestPrevSlide}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.5561 15C10.4013 15 10.2465 14.9435 10.1243 14.8224L4.8127 9.55746C3.94915 8.70151 3.94915 7.29647 4.8127 6.44052L10.1243 1.17563C10.3606 0.941456 10.7516 0.941456 10.9879 1.17563C11.2241 1.40981 11.2241 1.7974 10.9879 2.03158L5.67624 7.29647C5.2852 7.68407 5.2852 8.31392 5.67624 8.70151L10.9879 13.9664C11.2241 14.2006 11.2241 14.5882 10.9879 14.8224C10.8657 14.9354 10.7109 15 10.5561 15Z"
                                        fill="#202B21"/>
                                </svg>
                            </a>
                            <a className={!bestForwardEnabled ? "move-forward inactive" : "move-forward"}
                               onClick={handleBestNextSlide}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.44392 1C5.59871 1 5.75349 1.05652 5.87569 1.17765L11.1873 6.44254C12.0508 7.29849 12.0508 8.70353 11.1873 9.55948L5.87569 14.8244C5.63944 15.0585 5.2484 15.0585 5.01215 14.8244C4.7759 14.5902 4.7759 14.2026 5.01215 13.9684L10.3238 8.70353C10.7148 8.31593 10.7148 7.68608 10.3238 7.29849L5.01215 2.0336C4.7759 1.79942 4.7759 1.41182 5.01215 1.17765C5.13435 1.0646 5.28914 1 5.44392 1Z"
                                        fill="#202B21"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="carousel__items">
                        <Swiper
                            ref={swiperBestRef}
                            // onSwiper={(swiper: SwiperClass) => Object.assign(swiper.params, bestConfig)}
                            spaceBetween={25}
                            grabCursor={true}
                            speed={700}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1
                                },
                                607: {
                                    slidesPerView: 2
                                },
                                923: {
                                    slidesPerView: 3
                                },
                                1300: {
                                    slidesPerView: 4
                                }
                            }}
                        >
                            {
                                bestProducts?.map(product => {
                                    return (
                                        <SwiperSlide key={product.id}>
                                            <ProductCard product={product} isLogged={isLogged}/>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>

            <section className="info" id="delivery">
                <div className="container">
                    <div className="info__title">Доставка и оплата</div>
                    <div className="info__item info__delivery">
                        <div className="info__image">
                            <img src="/images/page/delivery.png" alt="delivery"/>
                        </div>
                        <div className="info__text">
                            <div className="info__text-main">1. Доставка курьером (по г.&nbsp;Минску)
                                - {deliveryCost} BYN
                            </div>
                            <div className="info__text-extra">На следующий день после оформления заказа</div>
                        </div>
                        <div className="info__text">
                            <div className="info__text-main">2. Самовывоз - 0 BYN</div>
                            <div className="info__text-extra">
                                Пункт выдачи товаров: г.&nbsp;Минск, ул.&nbsp;Калиновского 61, подъезд 1, офис 6
                            </div>
                        </div>
                    </div>
                    <div className="info__item info__payment">
                        <div className="info__image">
                            <img src="/images/page/payment.png" alt="payment"/>
                        </div>
                        <div className="info__text">
                            <div className="info__text-main">1. Наличный расчет при получении</div>
                        </div>
                        <div className="info__text">
                            <div className="info__text-main">2. Безналичный расчет при получении</div>
                        </div>
                        <div className="info__text">
                            <div className="info__text-main">3. Оплата банковской картой в интернет-магазине</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reviews" id="reviews">
                <div className="container">
                    <div className="reviews__title">Отзывы о Home decor</div>
                    <div className="reviews__carousel">
                        <Swiper
                            ref={swiperReviewRef}
                            // onSwiper={(swiper: SwiperClass) => Object.assign(swiper.params, reviewConfig)}
                            spaceBetween={26}
                            grabCursor={true}
                            speed={700}
                            loop={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1
                                },
                                818: {
                                    slidesPerView: 2,
                                    spaceBetween: 0
                                },
                                1240: {
                                    slidesPerView: 3
                                }
                            }}
                        >
                            {
                                reviews?.map(review => {
                                    return (
                                        <SwiperSlide key={review.id}>
                                            <div className="review__item">
                                                <div className="review__item-head">
                                                    <div className="review__item-image"
                                                         style={{backgroundImage: `url(/images/reviews/${review.image})`}}></div>
                                                    <div className="reviews__item-name">{review.name}</div>
                                                </div>
                                                <div className="review__item-text">{review.text}</div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                        <div className="reviews__arrows">
                            <a className="move-backward" onClick={handleReviewPrevSlide}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.5551 15C10.4003 15 10.2455 14.9435 10.1233 14.8224L4.81172 9.55746C3.94818 8.70151 3.94818 7.29647 4.81172 6.44052L10.1233 1.17563C10.3596 0.941456 10.7506 0.941456 10.9869 1.17563C11.2231 1.40981 11.2231 1.7974 10.9869 2.03158L5.67526 7.29647C5.28423 7.68407 5.28423 8.31392 5.67526 8.70151L10.9869 13.9664C11.2231 14.2006 11.2231 14.5882 10.9869 14.8224C10.8647 14.9354 10.7099 15 10.5551 15Z"
                                        fill="#202B21"/>
                                </svg>
                            </a>
                            <a className="move-forward" onClick={handleReviewNextSlide}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.44392 1C5.59871 1 5.75349 1.05652 5.87569 1.17765L11.1873 6.44254C12.0508 7.29849 12.0508 8.70353 11.1873 9.55948L5.87569 14.8244C5.63944 15.0585 5.2484 15.0585 5.01215 14.8244C4.7759 14.5902 4.7759 14.2026 5.01215 13.9684L10.3238 8.70353C10.7148 8.31593 10.7148 7.68608 10.3238 7.29849L5.01215 2.0336C4.7759 1.79942 4.7759 1.41182 5.01215 1.17765C5.13435 1.0646 5.28914 1 5.44392 1Z"
                                        fill="#202B21"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.192095535324!2d27.628582077113872!3d53.946095729679506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcf257bd628cf%3A0xba37622c91fbdd9!2sVulica%20Kalino%C5%ADskaha%2061%2C%20Minsk!5e0!3m2!1sen!2sby!4v1683538393364!5m2!1sen!2sby"
                    width="100%"
                    height="450"
                    title={'map'}
                    style={{border: 0}}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
    );
};

export default Main;