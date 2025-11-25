import { FC } from "react";
import { styled } from "styled-components";
import arrowLeftActive from "../assets/icons/arrow-left-dark_9x14.svg";
import arrowRightActive from "../assets/icons/arrow-right_dark_9x14.svg";
import arrowLeftDisabled from "../assets/icons/arrow-left_grey_9x14.svg";
import arrowRightDiabled from "../assets/icons/arrow-right_grey_9x14.svg";
import SwiperInstance from "swiper";

export interface TimelineSliderControlsProps {
  swiperRef: React.RefObject<SwiperInstance | null>;
  currentIndex: number;
  total: number;
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  bottom: unset;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 0 80px;
  font-size: 16px;
  z-index: 10;

  @media (max-width: 1023px) {
    top: unset;
    bottom: -8px;
    padding: 0 20px;
    font-size: 14px;
  }
`;

const SliderControls = styled.div`
  display: flex;
  gap: 8px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: inherit;
    border-radius: 50%;
    border: 1px solid #9ba5b9;

    span {
      display: inline-block;
      background-image: url(${arrowLeftActive});
      background-size: cover;
      background-repeat: no-repeat;
      width: 9px;
      height: 14px;
    }

    .arrow-right {
      background-image: url(${arrowRightActive});
    }

    &:disabled {
      border: 1px solid #bcc4d2;
    }

    &:active {
      background-color: #fff;
    }

    &:disabled span {
      background-image: url(${arrowLeftDisabled});
    }

    &:disabled .arrow-right {
      background-image: url(${arrowRightDiabled});
    }
  }
  @media (max-width: 1023px) {
    button {
      width: 25px;
      height: 25px;

      span {
        width: 6px;
        height: 8px;
      }
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
