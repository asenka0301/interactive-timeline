import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import TimelineSliderControls from "../TimelineSliderControls/TimelineSliderControls";
import CategoryEventsSlider from "../CategoryEventsSlider/CategoryEventsSlider";

import { Container, SlideInner } from "./TimelineSlider.styled";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type TimelineSliderProps = {
  timelineData: Array<TimelineCategory>;
  activeCategory: CategoryId;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
  total: number;
};

const TimelineSlider: FC<TimelineSliderProps> = ({
  timelineData,
  activeCategory,
  setActiveCategory,
  total,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiper: SwiperClass) => {
    const index = swiper.realIndex ?? swiper.activeIndex;
    const category = timelineData[index];
    if (category) {
      setActiveCategory(category.id);
    }
    setCurrentIndex(swiper.realIndex + 1);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const newIndex = timelineData.findIndex(
      (category) => category.id === activeCategory
    );

    if (newIndex === -1) return;
    const current = swiper.realIndex ?? swiper.activeIndex;
    if (current === newIndex) return;

    swiper.slideTo(newIndex);
    setCurrentIndex(newIndex + 1);
  }, [activeCategory, timelineData]);

  useGSAP(
    (_context, contextSafe) => {
      if (!swiperInstance || !contextSafe) return;

      const onTransitionStart = contextSafe((swiper: SwiperClass) => {
        const { slides, activeIndex, previousIndex } = swiper;
        const activeSlide = slides[activeIndex];
        const prevSlide = slides[previousIndex];

        if (activeSlide) activeSlide.style.transition = "none";
        if (prevSlide) prevSlide.style.transition = "none";

        if (prevSlide) {
          gsap.fromTo(
            prevSlide,
            { opacity: 1 },
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            }
          );
        }

        if (activeSlide) {
          gsap.fromTo(
            activeSlide,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              delay: 0.8,
              ease: "power2.inOut",
            }
          );
        }
      });

      swiperInstance.on("slideChangeTransitionStart", onTransitionStart);

      return () => {
        swiperInstance.off("slideChangeTransitionStart", onTransitionStart);
      };
    },
    { dependencies: [swiperInstance], scope: containerRef }
  );

  return (
    <Container ref={containerRef}>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation, EffectFade]}
        pagination={{ clickable: true, enabled: true }}
        allowTouchMove={false}
        onSlideChange={handleSlideChange}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          setSwiperInstance(swiper);
        }}
        scrollbar={false}
        breakpoints={{
          1024: {
            pagination: {
              enabled: false,
            },
          },
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
      >
        {timelineData.map((category) => (
          <SwiperSlide key={category.id}>
            <SlideInner>
              <h2>{category.title}</h2>
              <CategoryEventsSlider category={category} />
            </SlideInner>
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
