import React, {useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {productAPI, selectCart} from "../../../store";
import {useAppSelector} from "../../../hooks";
import {useProducts} from "../../../hooks/useProducts";

import {ProductCard, SliderButtons} from "../../../components";

const DetailRecommendedProducts = () => {
    const {data: recommendedProductsData} = productAPI.useGetBestProductsQuery();
    const products = useProducts(recommendedProductsData);
    const swiperRecommendedRef = useRef<SwiperRef>(null);
    const cart = useAppSelector(selectCart);

    return (
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
                        products.map(product => {
                            const foundItem = cart.items.find(item => item.product.id === product.id);
                            const countInCart = foundItem ? foundItem.quantity : 0;

                            return (
                                <SwiperSlide key={product.id}>
                                    <ProductCard
                                        product={product}
                                        countInCart={countInCart}
                                    />
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default DetailRecommendedProducts;