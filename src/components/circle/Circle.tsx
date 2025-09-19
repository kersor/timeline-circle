import React, { memo, RefObject, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { ITheme } from '../../types/swiper'
import clsx from 'clsx'
import gsap from 'gsap';

interface Props {
    data: ITheme[]
    radius: number
    activeIndex: number
    handleNextAndPrev: (index: number) => void
    date: {min: number, max: number}
    containerRef: RefObject<HTMLDivElement | null>
    itemRefs: RefObject<HTMLDivElement[]>
}

const Circle = ({
    data,
    radius,
    activeIndex,
    handleNextAndPrev,
    date,
    containerRef,
    itemRefs,
}: Props) => {
    const minRef = useRef<HTMLSpanElement>(null);
    const maxRef = useRef<HTMLSpanElement>(null);

    const prevMin = useRef({ val: 0 });
    const prevMax = useRef({ val: 0 });

    // Анимация для min
    useEffect(() => {
        if (!minRef.current) return;
        gsap.to(prevMin.current, {
            val: date.min,
            duration: 1,
            roundProps: "val",
            ease: "power1.out",
            onUpdate: () => {
                if (minRef.current) minRef.current.textContent = prevMin.current.val.toString();
            },
        });
    }, [date.min]);
    
    // Анимация для max
    useEffect(() => {
        if (!maxRef.current) return;
        gsap.to(prevMax.current, {
            val: date.max,
            duration: 1,
            roundProps: "val",
            ease: "power1.out",
            onUpdate: () => {
                if (maxRef.current) maxRef.current.textContent = prevMax.current.val.toString();
            },
        });
    }, [date.max]);

    return (
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
                <div className={styles.date_wrapper}>
                    <div className={styles.date}>
                        <span ref={minRef} className={styles.date_min}>{date.min}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span ref={maxRef} className={styles.date_max}>{date.max}</span>
                    </div>
                </div>
            </div>
    )
}

export default memo(Circle)