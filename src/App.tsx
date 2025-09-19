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
import { SectionMinMax } from './components/sectionMinMax/SectionMinMax';
import { useResizeRadius } from './hooks/useResizeRadius';
import { useCirclePositioning } from './hooks/useCirclePositioning';
import { useCircleRotation } from './hooks/useCircleRotation';
import { useFadeSwitch } from './hooks/useFadeSwitch';
import { useNavigation } from './hooks/useNavigation';



export interface IBeginAndIsEndEvent {
  isEnd: boolean
  isBegin: boolean
}

export interface IDate {
  max: number
  min: number
}

function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [data, setData] = useState<ITheme[]>([])
  const [date, setDate] = useState<IDate>({ min: 0, max: 0 })
  const [isBeginAndIsEndEvent, setIsBeginAndIsEndEvent] = useState<IBeginAndIsEndEvent>({ isEnd: false, isBegin: true })

  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentSwiperRef = useRef<SwiperType | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const {width, radius} = useResizeRadius()
  useCirclePositioning({data, radius, itemRefs});
  useCircleRotation({data, activeIndex, containerRef, itemRefs, setDate});
  const fadeSwitch = useFadeSwitch({contentRef, setActiveIndex, contentSwiperRef});
  const { handlePrev, handleNext, handleNextAndPrev } = useNavigation({activeIndex, dataLength: data.length, fadeSwitch});
  

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



  if (!data.length) return null

  return (
    <div className={styles.wrapper}>
      <Container style={{position: "relative"}}>
        <PageTitle />
        {
          width > 600 && (
            <Circle 
              data={data}  
              radius={radius} 
              activeIndex={activeIndex} 
              handleNextAndPrev={handleNextAndPrev}
              itemRefs={itemRefs}
              containerRef={containerRef}
            />
          )
        }

        <SectionMinMax date={date} />

        <div className={styles.section_bottom}>
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
            width={width}
          />
        </div>
        {
          width > 600 && (
              <React.Fragment>
                <div className={styles.line_vertical}></div>
                <div className={styles.line_horizontal}></div>  
              </React.Fragment>
          )
        }
      </Container>
    </div>
  );
}

export default App;
