import { useEffect, useState } from "react";

const RADIUS_BIG = 265;
const RADIUS_SMALL = 200;

export const useResizeRadius = () => {
    const [width, setWidth] = useState(0)
    const [radius, setRadius] = useState(RADIUS_BIG)

    useEffect(() => {
        const handleResize = () => {
            const wth = window.outerWidth
            setWidth(wth)
            if (wth >= 950) setRadius(RADIUS_BIG)
            else if (wth < 950) setRadius(RADIUS_SMALL)
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        width,
        radius
    }
}