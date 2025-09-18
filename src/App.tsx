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
import clsx from 'clsx'

const radius = 215

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentSwiperRef = useRef<SwiperType | null>(null)

  const [isBeginAndIsEndEvent, setIsBeginAndIsEndEvent] = useState<{isEnd: boolean, isBegin: boolean}>({
    isEnd: false,
    isBegin: true
  })
  const eventPrevRef = useRef<HTMLDivElement>(null);
  const eventNextRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);


 

  const handlePrev = () => {
    if (activeIndex > 0) fadeSwitch(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) fadeSwitch(activeIndex + 1);
  };

  const handleNextAndPrev = (index: number) => {
    fadeSwitch(--index);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const n = data.length;
    const centerX = radius;
    const centerY = radius;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const angle = (i / n) * 360;
      const rad = (angle * Math.PI) / 180;

      const x = centerX + radius * Math.cos(rad) - el.offsetWidth / 2;
      const y = centerY + radius * Math.sin(rad) - el.offsetHeight / 2;

      gsap.set(el, { x, y, rotate: 0 }); // начальная позиция, элементы вертикальны
    });
  }, []);

  useEffect(() => {
    rotateCircle(activeIndex);
  }, [activeIndex]);

  const rotateCircle = (index: number) => {
    const n = data.length;
    const anglePerItem = 360 / n;
    const targetRotate = -anglePerItem * index + 270;

    if (!containerRef.current) return;

    // текущее вращение контейнера
    const currentRotate = gsap.getProperty(containerRef.current, 'rotate') as number;

    // разница углов
    let delta = targetRotate - currentRotate;

    // для кратчайшего пути
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const speed = 180; // градусы в секунду, можно менять
    const duration = Math.abs(delta) / speed;

    gsap.to(containerRef.current, {
      rotate: targetRotate,
      duration: duration,
      ease: 'power2.out',
    });

    // компенсируем наклон элементов
    itemRefs.current.forEach(el => {
      if (!el) return;
      gsap.to(el, {
        rotate: -targetRotate,
        duration: duration,
        ease: 'power2.out',
      });
    });
  };

  
  const fadeSwitch = (newIndex: number) => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex(newIndex);
        contentSwiperRef?.current?.slideTo(0);
        gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      },
    });
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.circle_wrapper}>
        <div className={styles.circle} ref={containerRef} style={{ width: radius * 2, height: radius * 2}}>
          {data.map((item, i) => (
            <div 
              key={i} ref={(el) => {if (el) itemRefs.current[i] = el}} 
              className={
                clsx(styles.circle_item__wrapper, activeIndex === i && styles.circle_item__wrapper__active)
              }
              onClick={() => handleNextAndPrev(i)}
            >
              <div className={styles.circle_item__border}></div> 
              <div className={styles.circle_item}></div>           {/* фон */}
              <div className={styles.circle_item__content_number}>{++i}</div>
              <div className={styles.circle_item__content_theme}>{item.theme}</div>
            </div>
          ))}
        </div>
      </div>

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
      <div className={styles.events} ref={contentRef}>
        <Swiper  
          onSwiper={(swiper: SwiperType) => (contentSwiperRef.current = swiper)}
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
                <div  className={styles.activeIndex}>
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
