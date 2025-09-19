
interface Props {
    activeIndex: number,
    dataLength: number,
    fadeSwitch: (newIndex: number) => void
}

export const useNavigation = ({
    activeIndex,
    dataLength,
    fadeSwitch
}: Props) => {
  const handlePrev = () => {
    if (activeIndex > 0) fadeSwitch(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < dataLength - 1) fadeSwitch(activeIndex + 1);
  };

  const handleNextAndPrev = (index: number) => {
    fadeSwitch(index - 1);
  };

  return { handlePrev, handleNext, handleNextAndPrev };
}
