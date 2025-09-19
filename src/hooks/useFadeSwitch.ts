import { RefObject } from "react";
import gsap from "gsap";
import type { Swiper as SwiperType } from "swiper";

interface Props {
  contentRef: RefObject<HTMLDivElement | null>,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  contentSwiperRef: RefObject<SwiperType | null>
}

export const useFadeSwitch = ({
    contentRef,
    setActiveIndex,
    contentSwiperRef
}: Props) => {
  const fadeSwitch = (newIndex: number) => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex(newIndex);
        contentSwiperRef.current?.slideTo(0);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
      },
    });
  };

  return fadeSwitch;
}
