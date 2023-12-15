import React, {useRef} from 'react';
import {useParams} from "react-router-dom";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import './Detail.scss';

import {SERVER_STATIC_PATH} from "../../../constants/constants";
import {productAPI} from "../../../store";
import {useScrollToAnchor} from "../../../hooks/useScrollToAnchor";

import {IconName} from "../../../types/icon-name.type";

import ProductCard from "../../../components/ProductCard/ProductCard";
import SliderButtons from "../../../components/SliderButtons/SliderButtons";
import Loader from "../../../components/Loader/Loader";
import Icon from "../../../components/Icon/Icon";

const Detail = () => {
    const params = useParams();
    const swiperRecommendedRef = useRef<SwiperRef>(null);
    const {data: product, isLoading} = productAPI.useGetProductQuery(params['url'] as string);
    const {data: recommendedProducts} = productAPI.useGetBestProductsQuery();
    const isLogged: boolean = false;

    const handleAddToCart = () => {
    };

    const handleRemoveFromCart = () => {
    };

    const handleUpdateFavorite = () => {
    };

    useScrollToAnchor();

    return (
        <div className='detail'>
            <Loader isLoading={isLoading}/>
            {(!isLoading && product) &&
                <div className='container'>
                    <div>
                        <div className='detail__title'>{product.name}</div>
                        <div className='detail__product'>
                            <div className='detail__image'
                                 style={{backgroundImage: `url(${SERVER_STATIC_PATH}${product.image})`}}></div>
                            <div className='detail__info'>
                                {(product.temperature && product.humidity && product.lightning) &&
                                    <div className='detail__info-items'>
                                        {!!product.lightning &&
                                            <div className='detail__info-item'>
                                                <div>
                                                    <Icon name={IconName.lighting}/>
                                                </div>
                                                <div className='detail__info-item-text'>
                                                    <div className='detail__info-item-title'>Освещение</div>
                                                    <div
                                                        className='detail__info-item-description'>{product.lightning}</div>
                                                </div>
                                            </div>
                                        }

                                        {!!product.humidity &&
                                            <div className='detail__info-item'>
                                                <div>
                                                    <Icon name={IconName.humidity}/>
                                                </div>
                                                <div className='detail__info-item-text'>
                                                    <div className='detail__info-item-title'>Влажность</div>
                                                    <div className='detail__info-item-description'>
                                                        {product.humidity}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {!!product.temperature &&
                                            <div className='detail__info-item'>
                                                <div>
                                                    <Icon name={IconName.temperature}/>
                                                </div>
                                                <div className='detail__info-item-text'>
                                                    <div className='detail__info-item-title'>Температура</div>
                                                    <div
                                                        className='detail__info-item-description'>{product.temperature}</div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }

                                {product.height &&
                                    <div className='detail__info-param'>
                                        <div className='detail__info-param-name'>Высота:</div>
                                        <div>{product.height} см</div>
                                    </div>
                                }

                                {product.diameter &&
                                    <div className='detail__info-param'>
                                        <div className='detail__info-param-name'>Диаметр (горшка):</div>
                                        <div>{product.diameter} см</div>
                                    </div>
                                }

                                <div className='detail__info-params'>
                                    <div className='detail__info-params-count'>
                                        <span>Количество: </span>
                                        {/*<CountSelector count={} updateCount={} [count]="count" (onCountChange)="updateCount($event)"/>*/}
                                    </div>
                                    <div className='detail__info-params-price'>{product.price} BYN</div>
                                </div>

                                <div className='detail__info-actions'>
                                    {isLogged &&
                                        <button className='button button_transparent button_with-icon'
                                                onClick={handleUpdateFavorite}>

                                            {!product.inFavorites &&
                                                <Icon name={IconName.heart}/>
                                            }

                                            {!!product.inFavorites &&
                                                <Icon name={IconName.heartFilled}/>
                                            }

                                            {!product.inFavorites &&
                                                <span>В избранное</span>
                                            }

                                            {!!product.inFavorites &&
                                                <span>В избранном</span>
                                            }
                                        </button>
                                    }

                                    {!product.countInCart &&
                                        <button className='button' onClick={handleAddToCart}>В корзину</button>
                                    }

                                    {!!product.countInCart &&
                                        <button className='button button_transparent button_in-cart'
                                                onClick={handleRemoveFromCart}>
                                            <span>В корзине</span>
                                            <span>Удалить</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='recommended-products'>
                        <div className='carousel__header'>
                            <div className='carousel__title'>Рекомендуемые товары</div>
                            <SliderButtons
                                wrapperClass='carousel__arrows'
                                swiperRef={swiperRecommendedRef}
                                withLoop={false}
                            />
                        </div>
                        <div className='carousel__items'>
                            <Swiper
                                ref={swiperRecommendedRef}
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
                                    recommendedProducts?.map(product => {
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
                </div>
            }
        </div>
    );
};

export default Detail;