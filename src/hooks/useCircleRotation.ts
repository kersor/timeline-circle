import { RefObject, useEffect } from "react";
import { ITheme } from "../types/swiper";
import { IDate } from "../App";
import gsap from 'gsap'

interface Props {
    data: ITheme[],
    activeIndex: number,
    containerRef: RefObject<HTMLDivElement | null>,
    itemRefs: RefObject<HTMLDivElement[]>,
    setDate: React.Dispatch<React.SetStateAction<IDate>>
}

export const useCircleRotation = ({
    data,
    activeIndex,
    containerRef,
    itemRefs,
    setDate
}: Props) => {
    useEffect(() => {
        if (!data.length) return;
        rotateCircle(activeIndex);
    }, [activeIndex, data]);

    const rotateCircle = (index: number) => {
        const n = data.length;
        const anglePerItem = 360 / n;
        const targetRotate = -anglePerItem * index + 270;

        setDate({
            min: data[index].data[0].year,
            max: data[index].data[data[index].data.length - 1].year,
        });

        if (!containerRef.current) return;

        const currentRotate = gsap.getProperty(containerRef.current, "rotate") as number;
        let delta = targetRotate - currentRotate;

        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const speed = 180;
        const duration = Math.abs(delta) / speed;

        gsap.to(containerRef.current, {
            rotate: targetRotate,
                duration,
                ease: "power2.out",
            });

            itemRefs.current.forEach((el) => {
                if (!el) return;
                gsap.to(el, {
                    rotate: -targetRotate,
                    duration,
                    ease: "power2.out",
                }
            );
        });
    };
}