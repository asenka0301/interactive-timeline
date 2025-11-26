import { FC, useRef, useState } from "react";
import { type TimelineCategory } from "data/timelineData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { InnerSwiperWrapper, EventCard } from "./CategoryEventsSlider.styled";

type CategoryEventsSliderProps = {
  category: TimelineCategory;
};

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
