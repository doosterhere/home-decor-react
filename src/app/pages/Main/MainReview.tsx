import React, {useRef} from 'react';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

import {config} from "../../config/config";

import {SliderButtons} from "../../components";

const MainReview = () => {
    const reviews: { id: number, name: string, image: string, text: string }[] = config.reviews;
    const swiperReviewRef = useRef<SwiperRef>(null);

    return (
        <section className='reviews' id="reviews">
            <div className='container'>
                <div className='review__title'>Отзывы о Home decor</div>
                <div className='review__carousel'>
                    <Swiper
                        ref={swiperReviewRef}
                        spaceBetween={26}
                        grabCursor={true}
                        speed={700}
                        loop={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1
                            },
                            878: {
                                slidesPerView: 2,
                                spaceBetween: 0
                            },
                            1300: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        {
                            reviews?.map(review => {
                                return (
                                    <SwiperSlide key={review.id}>
                                        <div className='review__item'>
                                            <div className='review__item-head'>
                                                <div className='review__item-image'
                                                     style={{backgroundImage: `url(/images/reviews/${review.image})`}}></div>
                                                <div className='review__item-name'>{review.name}</div>
                                            </div>
                                            <div className='review__item-text'>{review.text}</div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                    <SliderButtons
                        wrapperClass={'review__arrows'}
                        swiperRef={swiperReviewRef}
                        withLoop={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default MainReview;