import React, {useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {productAPI} from "../../../store";
import {useProducts} from "../../../hooks/useProducts";

import {ProductCard, SliderButtons} from "../../../components";

const DetailRecommendedProducts = () => {
    const {data: recommendedProductsData} = productAPI.useGetBestProductsQuery();
    const products = useProducts(recommendedProductsData);
    const swiperRecommendedRef = useRef<SwiperRef>(null);

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
                        products.map(product =>
                            <SwiperSlide key={product.id}>
                                <ProductCard
                                    product={product}
                                />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default DetailRecommendedProducts;