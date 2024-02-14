import React, {useEffect, useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {productAPI, setCartCount} from "../../store";
import {useProducts} from "../../hooks/useProducts";
import {useAppDispatch, useCartRefetch} from "../../hooks";

import {ProductCard, SliderButtons} from "../../components";

const MainBestProducts = () => {
    const {data: bestProductsData} = productAPI.useGetBestProductsQuery();
    const bestProducts = useProducts(bestProductsData);
    const swiperBestRef = useRef<SwiperRef>(null);
    const dispatcher = useAppDispatch();
    const cart = useCartRefetch();

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

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
                                const foundItem = cart.items.find(item => item.productId === product.id);
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
        </section>
    );
};

export default MainBestProducts;