import React, { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { IDate } from '../../App';
import gsap from 'gsap'

interface Props {
    date: IDate
}

export const SectionMinMax = ({
    date
}: Props) => {
    const minRef = useRef<HTMLSpanElement>(null);
    const maxRef = useRef<HTMLSpanElement>(null);

    const prevMin = useRef({ val: 0 });
    const prevMax = useRef({ val: 0 });

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
        <div className={styles.date_wrapper}>
            <div className={styles.date}>
                <span ref={minRef} className={styles.date_min}>{date.min}</span>
                <span ref={maxRef} className={styles.date_max}>{date.max}</span>
            </div>
        </div>
    )
}
