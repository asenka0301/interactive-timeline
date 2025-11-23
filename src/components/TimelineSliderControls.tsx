import { styled } from "styled-components";
import arrowLeftActive from "../assets/icons/arrow-left-dark_6x8.svg";
import arrowRightActive from "../assets/icons/arrow-right_dark_6x8.svg";
import arrowLeftDisables from "../assets/icons/arrow-left_grey_6x8.svg";
import arrowRightDiabled from "../assets/icons/arrow-right_grey_6x8.svg";
import SwiperInstance from "swiper";
import { FC } from "react";

export interface TimelineSliderControlsProps {
  swiperRef: React.RefObject<SwiperInstance | null>;
  currentIndex: number;
  total: number;
}

const Container = styled.div`
  position: absolute;
  bottom: -8px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;
  font-size: 14px;
  z-index: 10;
`;

const SliderControls = styled.div`
  display: flex;
  gap: 8px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: inherit;
    border-radius: 50%;
    border: 1px solid #9ba5b9;

    span {
      display: inline-block;
      background-image: url(${arrowLeftActive});
      background-size: cover;
      background-repeat: no-repeat;
      width: 6px;
      height: 8px;
    }

    .arrow-right {
      background-image: url(${arrowRightActive});
    }

    &:disabled {
      border: 1px solid #bcc4d2;
    }

    &:disabled span {
      background-image: url(${arrowLeftDisables});
    }

    &:disabled .arrow-right {
      background-image: url(${arrowRightDiabled});
    }
  }
`;

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
