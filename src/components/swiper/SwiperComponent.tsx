import React, { RefObject, useRef, useState } from 'react'
import './styles.scss'
import styles from './styles.module.scss'

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; 

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { IData } from '../../types/swiper';
import { IBeginAndIsEndEvent } from '../../App';

const slidesPerView = 3

interface Props {
    data: IData[]
    contentRef: RefObject<HTMLDivElement | null>
    contentSwiperRef: RefObject<SwiperType | null>
    isBeginAndIsEndEvent: IBeginAndIsEndEvent
    setIsBeginAndIsEndEvent: React.Dispatch<React.SetStateAction<IBeginAndIsEndEvent>>
}

export const SwiperComponent = ({
    data,
    contentRef,
    contentSwiperRef,
    setIsBeginAndIsEndEvent,
    isBeginAndIsEndEvent
}: Props) => {
    const [stage, setStage] = useState(0)

    const eventPrevRef = useRef<HTMLDivElement>(null);
    const eventNextRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.events} ref={contentRef}>
            <div onClick={() => setStage(prev => prev - 1)} ref={eventPrevRef} className={`swiper-button-prev-custom ${isBeginAndIsEndEvent.isBegin && "disabled"}`}>
                <img src="/icons/arrow_blue.svg" alt="" />
            </div>
            <div className={styles.mySwiper_wrapper}>
                <Swiper  
                    onSwiper={(swiper: SwiperType) => (contentSwiperRef.current = swiper)}
                    onSlideChange={(swiper: SwiperType) => {
                        const start = swiper.activeIndex === 0
                        const end = stage < (data.length - (1 + slidesPerView))
                        setIsBeginAndIsEndEvent(prev => ({...prev, isBegin: start , isEnd: !end}))
                    }}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    spaceBetween={80}
                    slidesPerView={slidesPerView}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    
                >
                {
                    data.map((dta: IData) => (
                        <SwiperSlide>
                            <div  className={styles.activeIndex}>
                                <div className={styles.year}>{dta.year}</div>
                                <div className={styles.description}>{dta.description}</div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div onClick={() => setStage(prev => prev + 1)} ref={eventNextRef} className={`swiper-button-next-custom ${isBeginAndIsEndEvent.isEnd && "disabled"}`}>
                <img src="/icons/arrow_blue.svg" alt="" />
            </div>
        </div>
    )
}
