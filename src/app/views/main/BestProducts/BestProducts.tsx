import React, {FC, useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import './BestProduct.scss';

import {productAPI} from "../../../store";

import SliderButtons from "../../../components/SliderButtons/SliderButtons";
import ProductCard from "../../../components/ProductCard/ProductCard";

interface IBestProducts {
    isLogged: boolean;
}

const BestProducts: FC<IBestProducts> = ({isLogged}) => {
    const {data: bestProducts} = productAPI.useGetBestProductsQuery();
    const swiperBestRef = useRef<SwiperRef>(null);

    return (
        <section className="best-products">
            <div className="container">
                <div className="carousel__header">
                    <div className="carousel__title">Лучшие предложения месяца</div>
                    <SliderButtons
                        wrapperClass={"carousel__arrows"}
                        swiperRef={swiperBestRef}
                        withLoop={false}
                    />
                </div>
                <div className="carousel__items">
                    <Swiper
                        ref={swiperBestRef}
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
    );
};

export default BestProducts;