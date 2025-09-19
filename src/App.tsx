import styles from './styles/App.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper'; 

import { dataInfo } from './constants/swiper';
import gsap from 'gsap';
import Circle from './components/circle/Circle';
import { SwitchButtons } from './components/switchButtons/SwitchButtons';
import { SwiperComponent } from './components/swiper/SwiperComponent';
import { Container } from './components/container/Container';
import { PageTitle } from './components/pageTitle/PageTitle';
import { IData, ITheme } from './types/swiper';

const radius = 265

export interface IBeginAndIsEndEvent {
  isEnd: boolean
  isBegin: boolean
}

function App() {
  const [data, setData] = useState<ITheme[]>([])

  const contentRef = useRef<HTMLDivElement>(null);
  const contentSwiperRef = useRef<SwiperType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const [isBeginAndIsEndEvent, setIsBeginAndIsEndEvent] = useState<IBeginAndIsEndEvent>({
    isEnd: false,
    isBegin: true
  })
  const [date, setDate] = useState({
    min: 0,
    max: 0
  })
  const [activeIndex, setActiveIndex] = useState<number>(0);



  const handlePrev = () => {
    if (activeIndex > 0) fadeSwitch(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) fadeSwitch(activeIndex + 1);
  };

  const handleNextAndPrev = (index: number) => {
    fadeSwitch(--index);
  };



  useEffect(() => {
    if (!!dataInfo.length) {
      const dta = dataInfo.map((value: ITheme) => {
        return {
          theme: value.theme,
          data: value.data.sort((a: IData, b: IData) => a.year - b.year) 
        }
      })

      setData(dta)
    }
  }, [dataInfo])

  useEffect(() => {
    if (!data.length) return

    const n = data.length;
    const centerX = radius;
    const centerY = radius;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const angle = (i / n) * 360;
      const rad = (angle * Math.PI) / 180;

      const x = centerX + radius * Math.cos(rad) - el.offsetWidth / 2;
      const y = centerY + radius * Math.sin(rad) - el.offsetHeight / 2;

      gsap.set(el, { x, y, rotate: 0 }); 
    });
  }, [data]);

  useEffect(() => {
    if (!data.length) return
    rotateCircle(activeIndex);
  }, [activeIndex, data]);

  const rotateCircle = (index: number) => {
    const n = data.length;
    const anglePerItem = 360 / n;
    const targetRotate = -anglePerItem * index + 270;

    if (!containerRef.current) return;

    const currentRotate = gsap.getProperty(containerRef.current, 'rotate') as number;

    let delta = targetRotate - currentRotate;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const speed = 180;
    const duration = Math.abs(delta) / speed;

    setDate(prev => ({
      ...prev,
      min: data[index].data[0].year,
      max: data[index].data[data[index].data.length - 1].year,
    }))
    
    gsap.to(containerRef.current, {
      rotate: targetRotate,
      duration: duration,
      ease: 'power2.out',
    });

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

  if (!data.length) return null

  return (
    <div className={styles.wrapper}>
      <Container style={{position: "relative", paddingTop: `calc(170 / 1080 * 100vh)`}}>
        <PageTitle />
        <Circle 
          data={data}  
          radius={radius} 
          activeIndex={activeIndex} 
          date={date} 
          handleNextAndPrev={handleNextAndPrev}
          itemRefs={itemRefs}
          containerRef={containerRef}
        />

        <SwitchButtons 
          handlePrev={handlePrev}
          handleNext={handleNext}
          activeIndex={activeIndex}
          dataLen={data.length}
        />

        <SwiperComponent
          data={data[activeIndex].data}
          contentRef={contentRef}
          contentSwiperRef={contentSwiperRef}
          isBeginAndIsEndEvent={isBeginAndIsEndEvent}
          setIsBeginAndIsEndEvent={setIsBeginAndIsEndEvent}
        />
        <div className={styles.line_vertical}></div>
        <div className={styles.line_horizontal}></div>
      </Container>
    </div>
  );
}

export default App;
