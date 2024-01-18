import React, {FC, RefObject, useEffect, useState} from 'react';

import {SwiperRef} from "swiper/react";

import {IconName} from "../../types";

import {Icon} from "../../components";

interface ISliderButtons {
    wrapperClass: string;
    swiperRef: RefObject<SwiperRef>;
    withLoop: boolean;
}

export const SliderButtons: FC<ISliderButtons> =
    ({
         wrapperClass,
         swiperRef,
         withLoop
     }) => {
        const [backwardEnabled, setBackwardEnabled] = useState(false);
        const [forwardEnabled, setForwardEnabled] = useState(true);
        const [isSwiped, setIsSwiped] = useState(false);

        useEffect(() => {
            swiperRef.current?.swiper.on('slideChangeTransitionStart', () => {
                setIsSwiped(true);
                checkForward();
                checkBackward();
            });
        }, [isSwiped]);

        const checkBackward = () => {
            const leftSlideIndex = swiperRef.current?.swiper?.realIndex;

            if (!leftSlideIndex) {
                setBackwardEnabled(false);
                return;
            }

            setBackwardEnabled(true);
        };

        const checkForward = () => {
            const slidesPerView = swiperRef.current?.swiper?.params.slidesPerView;
            const leftSlideIndex = swiperRef.current?.swiper?.realIndex;
            const slidesLength = swiperRef.current?.swiper?.slides.length;

            if (leftSlideIndex + slidesPerView === slidesLength) {
                setForwardEnabled(false);
                return;
            }

            setForwardEnabled(true);
        };

        const handlePrev = () => {
            if (withLoop) {
                swiperRef.current?.swiper?.slidePrev();
                return;
            }

            if (backwardEnabled) {
                swiperRef.current?.swiper?.slidePrev();
            }
        }

        const handleNext = () => {
            if (withLoop) {
                swiperRef.current?.swiper.slideNext();
                return;
            }

            if (forwardEnabled) {
                swiperRef.current?.swiper?.slideNext();
            }
        }

        return (
            <div className={wrapperClass}>
                <span className={(!backwardEnabled && !withLoop) ? "move-backward inactive" : "move-backward"}
                      onClick={handlePrev}>
                    <Icon name={IconName.swiperBackward}/>
                    {!withLoop &&
                        <Icon name={IconName.swiperBackwardGray}/>
                    }
                </span>
                <span className={(!forwardEnabled && !withLoop) ? "move-forward inactive" : "move-forward"}
                      onClick={handleNext}>
                    <Icon name={IconName.swiperForward}/>
                    {!withLoop &&
                        <Icon name={IconName.swiperForwardGray}/>
                    }
                </span>
            </div>
        );
    };