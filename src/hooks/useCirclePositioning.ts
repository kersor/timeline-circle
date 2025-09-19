import { RefObject, useEffect } from "react";
import { ITheme } from "../types/swiper";
import gsap from 'gsap'

interface Props {
    data: ITheme[]
    radius: number,
    itemRefs: RefObject<HTMLDivElement[]>
}

export const useCirclePositioning = ({
    data,
    radius,
    itemRefs
}: Props) => {
    useEffect(() => {
        if (!data.length || !radius) return

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
    }, [data, radius]);

}