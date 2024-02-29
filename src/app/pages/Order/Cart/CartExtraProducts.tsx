import React, {useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {productAPI} from "../../../store";
import {useProducts} from "../../../hooks";

import {ProductCard, SliderButtons} from "../../../components";

const CartExtraProducts = () => {
    const {data: extraProductsData} = productAPI.useGetBestProductsQuery();
    const extraProducts = useProducts(extraProductsData);
    const swiperExtraRef = useRef<SwiperRef>(null);

    return (
        <div className="extra-products">
            <div className="carousel__header">
                <div className="carousel__title">С этими товарами также покупают</div>
                <SliderButtons
                    wrapperClass={"carousel__arrows"}
                    swiperRef={swiperExtraRef}
                    withLoop={false}
                />
            </div>
            <div className="carousel__items">
                <Swiper
                    ref={swiperExtraRef}
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
                        extraProducts?.map(product =>
                            (
                                <SwiperSlide key={product.id}>
                                    <ProductCard
                                        product={product}
                                        isLight
                                    />
                                </SwiperSlide>
                            )
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default CartExtraProducts;