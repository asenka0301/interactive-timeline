import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import TimelineSliderControls from "./TimelineSliderControls";
import CategoryEventsSlider from "./CategoryEventsSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type TimelineSliderProps = {
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
  total: number;
};

const Container = styled.div`
  position: relative;
  margin-top: 20px;

  @media (max-width: 1023px) {
    margin-top: 0;
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
    <Container>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true, enabled: true }}
        allowTouchMove={false}
        onSlideChange={handleSlideChange}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        scrollbar={false}
        breakpoints={{
          1024: {
            pagination: {
              enabled: false,
            },
          },
        }}
      >
        {timelineData.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryEventsSlider category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
      <TimelineSliderControls
        swiperRef={swiperRef}
        currentIndex={currentIndex}
        total={total}
      />
    </Container>
  );
};

export default TimelineSlider;
