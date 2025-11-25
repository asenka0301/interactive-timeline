import { FC, useRef, useState } from "react";
import { styled } from "styled-components";
import { type TimelineCategory } from "data/timelineData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import arrowLeft from "../assets/icons/arrow-left_blue_8x12.svg";
import arrowRight from "../assets/icons/arrow-right_blue-8x12.svg";

import "swiper/css";
import "swiper/css/navigation";

type CategoryEventsSliderProps = {
  category: TimelineCategory;
};

const InnerSwiperWrapper = styled.div`
  position: relative;
  padding: 130px 80px 20px;

  .container {
    position: relative;
    .navigation-btn {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: 2;

      .arrow-icon {
        display: inline-block;
        background-size: cover;
        background-repeat: no-repeat;
        width: 8px;
        height: 12px;
      }

      &:hover {
        box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);
      }
      &:disabled {
        display: none;
      }
    }

    .navigation-btn.prev {
      left: -60px;
      .arrow-icon {
        background-image: url(${arrowLeft});
      }
    }

    .navigation-btn.next {
      right: -50px;
      .arrow-icon {
        background-image: url(${arrowRight});
      }
    }
  }

  @media (max-width: 1023px) {
    padding: 20px 0 60px 20px;

    div {
      navigation-btn {
        display: none;
      }
    }
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  cursor: pointer;

  h3 {
    color: var(--color-blue);
    font-size: 25px;
    font-weight: 700;
    white-space: nowrap;
  }

  .description {
    margin: 0;
    font-size: 20px;
  }

  @media (max-width: 1023px) {
    max-width: 170px;

    h3 {
      font-size: 16px;
    }
    .description {
      font-size: 14px;
    }
  }
`;

const CategoryEventsSlider: FC<CategoryEventsSliderProps> = ({ category }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = (swiper: SwiperType) => {
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  };

  return (
    <InnerSwiperWrapper>
      <div className="container">
        <Swiper
          modules={[Navigation]}
          nested={true}
          breakpoints={{
            320: {
              slidesPerView: 1.6,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={updateButtons}
          onSlideChange={updateButtons}
        >
          {category.events.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard>
                <h3>{event.year}</h3>
                <p className="description">{event.description}</p>
              </EventCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className="navigation-btn prev"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canPrev}
        >
          <span className="arrow-icon"></span>
        </button>
        <button
          type="button"
          className="navigation-btn next"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canNext}
        >
          <span className="arrow-icon"></span>
        </button>
      </div>
    </InnerSwiperWrapper>
  );
};

export default CategoryEventsSlider;
