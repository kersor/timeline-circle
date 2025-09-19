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
    containerRef: RefObject<HTMLDivElement | null>
    itemRefs: RefObject<HTMLDivElement[]>
}

const Circle = ({
    data,
    radius,
    activeIndex,
    handleNextAndPrev,
    containerRef,
    itemRefs,
}: Props) => {

    

    return (
            <div className={styles.circle_wrapper}>
                <div className={styles.circle} ref={containerRef} style={{ width: radius * 2, height: radius * 2}}>
                {data.map((item, i) => (
                    <div 
                    key={i} ref={(el) => {if (el) itemRefs.current[i] = el}} 
                    className={
                        clsx(styles.circle_item__wrapper, 
                        activeIndex === i && styles.circle_item__wrapper__active)
                    }
                    onClick={() => handleNextAndPrev(i)}
                    >
                        <div className={styles.circle_item__border}></div> 
                        <div className={styles.circle_item}></div>           
                        <div className={styles.circle_item__content_number}>{++i}</div>
                        <div className={styles.circle_item__content_theme}>{item.theme}</div>
                    </div>
                ))}
                </div>
            </div>
    )
}

export default memo(Circle)