import { FC } from "react";
import { styled } from "styled-components";
import { type TimelineCategory } from "data/timelineData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type CategoryEventsSliderProps = {
  category: TimelineCategory;
};

const InnerSwiperWrapper = styled.div`
  padding: 130px 80px 0;

  @media (max-width: 1023px) {
    padding: 20px 0 60px 20px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  @media (min-width: 1024px) {
    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: #fff;

      .swiper-navigation-icon {
        width: 10px;
        height: 15px;
      }
    }
    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
      display: none;
    }
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 200px;
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
    flex: 0 0 160px;

    h3 {
      font-size: 16px;
    }
    .description {
      font-size: 14px;
    }
  }
`;

const CategoryEventsSlider: FC<CategoryEventsSliderProps> = ({ category }) => {
  return (
    <InnerSwiperWrapper>
      <Swiper
        modules={[Navigation]}
        nested={true}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
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
    </InnerSwiperWrapper>
  );
};

export default CategoryEventsSlider;
