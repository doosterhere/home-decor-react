import React, {useEffect, useRef, useState} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {cartAPI, productAPI, selectIsLogged, setCartCount} from "../../store";
import {useProducts} from "../../hooks/useProducts";
import {useAppDispatch, useAppSelector, useCart} from "../../hooks";

import {CartType} from "../../types";

import {ProductCard, SliderButtons} from "../../components";

const MainBestProducts = () => {
    const {data: bestProductsData} = productAPI.useGetBestProductsQuery();
    const bestProducts = useProducts(bestProductsData);
    const swiperBestRef = useRef<SwiperRef>(null);
    const dispatcher = useAppDispatch();
    const cartPromise = dispatcher(cartAPI.endpoints?.getCart.initiate());
    const refetchCartPromise = cartPromise.refetch.bind(cartPromise);
    const [fetchedCart, setFetchedCart] = useState<CartType>({items: []});
    const cart = useCart(fetchedCart);
    const isLogged = useAppSelector(selectIsLogged);
    const [needRefetch, setNeedRefetch] = useState(false);

    useEffect(() => {
        getCart().catch(error => console.log('error in fetch after login/logout: ', error));

        if (needRefetch) {
            setNeedRefetch(false);
        }
    }, [isLogged, needRefetch]);

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

    async function getCart() {
        await refetchCartPromise()
            .then(res => {
                if (res && res.data && 'items' in res.data) {
                    setFetchedCart(res.data);
                }
            }, rej => {
                console.log('reason for rejection: ' + rej);
            })
            .catch((err) => console.log('error when fetching cart data in MainBestProducts: ' + err))
            .finally(() => {
                cartPromise.unsubscribe();
            });
    }

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
                                            setCart={setFetchedCart}
                                            setNeedRefetch={setNeedRefetch}
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