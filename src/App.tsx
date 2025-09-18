import logo from './logo.svg';
import styles from './styles/App.module.scss';

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; 

import './styles/App.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { data } from './constants/swiper';
import { IData, ITheme } from './types/swiper';
import gsap from 'gsap';

const radius = 215

function App() {
  const ref = useRef<SwiperType | null>(null)

  const [isBeginAndIsEndEvent, setIsBeginAndIsEndEvent] = useState<{isEnd: boolean, isBegin: boolean}>({
    isEnd: false,
    isBegin: true
  })
  const eventPrevRef = useRef<HTMLDivElement>(null);
  const eventNextRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);


 

  const handlePrev = () => {
    ref.current?.slidePrev();
  };

  const handleNext = () => {
    ref.current?.slideNext();
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const n = data.length;
    const centerX = radius;
    const centerY = radius;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const angle = (i / n) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle) - el.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - el.offsetHeight / 2;

      gsap.set(el, { x, y }); 
    });
  }, [data, radius]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle_wrapper}>
        <div className={styles.circle} ref={containerRef} style={{ width: radius * 2, height: radius * 2}}>
          {data.map((item, i) => (
            <div key={i} ref={(el) => {if (el) itemRefs.current[i] = el}} className={styles.circle_item__wrapper}>
              <div className={styles.circle_item__border}></div> 
              <div className={styles.circle_item}></div>           {/* фон */}
              <div className={styles.circle_item__content}>{++i}</div>
            </div>
          ))}
        </div>
      </div>

      {/* <Swiper
        onSwiper={(swiper: SwiperType) => ref.current = swiper}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={styles.mySwiper2}
      >
        {
          data.map((dta) => (
            <SwiperSlide>{dta.theme}</SwiperSlide>
          ))
        }
      </Swiper> */}

      <div className={styles.switch_wrapper}>
        <div className={styles.switch_numbers}>0{activeIndex + 1}/0{data.length}</div>
        <div className={styles.switch_buttons}>
          <div onClick={handlePrev} className={styles.switch_button}>
            <img src="/icons/left_arrow.svg" alt="" />
          </div>
          <div onClick={handleNext} className={styles.switch_button}>
            <img src="/icons/right_arrow.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.events}>
        <Swiper  
          onSlideChange={(swiper: SwiperType) => {
            const start = swiper.activeIndex === 0
            const end = swiper.activeIndex === data[activeIndex].data.length - 1
            setIsBeginAndIsEndEvent(prev => ({...prev, isBegin: start , isEnd: end}))
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          spaceBetween={80}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.mySwiper}
        >
          {
            data[activeIndex].data.map((dta: IData) => (
              <SwiperSlide>
                <div className={styles.activeIndex}>
                  <div className={styles.year}>{dta.year}</div>
                  <div className={styles.description}>{dta.description}</div>
                </div>
              </SwiperSlide>
            ))
          }

        </Swiper>
        <div ref={eventPrevRef} className={`swiper-button-prev-custom ${isBeginAndIsEndEvent.isBegin && "disabled"}`}>
          <img src="/icons/arrow_blue.svg" alt="" />
        </div>
        <div ref={eventNextRef} className={`swiper-button-next-custom ${isBeginAndIsEndEvent.isEnd && "disabled"}`}>
          <img src="/icons/arrow_blue.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
