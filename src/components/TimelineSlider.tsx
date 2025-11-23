import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import TimelineSliderControls from "./TimelineSliderControls";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type TimelineSliderProps = {
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
  total: number;
};

const EventsRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 20px 0 60px 20px;
  overflow-x: auto;
  scrollbar-width: none;
  transition-timing-function: linear;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 160px;
  max-width: 220px;

  h3 {
    color: var(--color-blue);
    font-weight: 700;
    white-space: nowrap;
  }

  .description {
    margin: 0;
    font-size: 14px;
  }
`;

const TimelineSlider: FC<TimelineSliderProps> = ({
  timelineData,
  setActiveCategory,
  total,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleSlideChange = (swiper: SwiperClass) => {
    const index = swiper.realIndex ?? swiper.activeIndex;
    const category = timelineData[index];
    if (category) {
      setActiveCategory(category.id);
    }
    setCurrentIndex(swiper.realIndex + 1);
  };
  return (
    <div style={{ position: "relative" }}>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        allowTouchMove={false}
        onSlideChange={handleSlideChange}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        scrollbar={false}
      >
        {timelineData.map((category) => (
          <SwiperSlide key={category.id}>
            <EventsRow>
              {category.events.map((event) => (
                <EventCard key={event.id}>
                  <h3>{event.year}</h3>
                  <p className="description">{event.description}</p>
                </EventCard>
              ))}
            </EventsRow>
          </SwiperSlide>
        ))}
      </Swiper>
      <TimelineSliderControls
        swiperRef={swiperRef}
        currentIndex={currentIndex}
        total={total}
      />
    </div>
  );
};

export default TimelineSlider;
