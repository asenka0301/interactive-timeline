import { FC } from "react";
import SwiperInstance from "swiper";

import { Container, SliderControls } from "./TimelineSliderControls.styled";

export interface TimelineSliderControlsProps {
  swiperRef: React.RefObject<SwiperInstance | null>;
  currentIndex: number;
  total: number;
}

const TimelineSliderControls: FC<TimelineSliderControlsProps> = ({
  swiperRef,
  currentIndex,
  total,
}) => {
  return (
    <Container>
      <div>{`0${currentIndex}/0${total}`}</div>
      <SliderControls>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={currentIndex === 1}
        >
          <span></span>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={currentIndex === total}
        >
          <span className="arrow-right"></span>
        </button>
      </SliderControls>
    </Container>
  );
};

export default TimelineSliderControls;
