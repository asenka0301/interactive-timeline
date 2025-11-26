import { Dispatch, FC, SetStateAction, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import TimelineOrbitNavigation from "../TimelineOrbitNavigation/TimelineOrbitNavigation";

import { Container, Lines } from "./TimelineHeader.styled";

type TimelineHeaderProps = {
  activeCategoryData?: TimelineCategory;
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
};

const TimelineHeader: FC<TimelineHeaderProps> = ({
  activeCategoryData,
  timelineData,
  setActiveCategory,
}) => {
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const events = activeCategoryData?.events ?? [];
  const startYear = events[0]?.year ?? 0;
  const endYear = events[events.length - 1]?.year ?? 0;

  const prevValues = useRef<{ startYear: number; endYear: number }>({
    startYear,
    endYear,
  });

  useGSAP(() => {
    const startNode = startRef.current;
    const endNode = endRef.current;

    if (!startNode || !endNode) return;

    const startObj = { value: prevValues.current.startYear };
    const endObj = { value: prevValues.current.endYear };

    gsap.to(startObj, {
      value: startYear,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: () => {
        startNode.textContent = String(Math.round(startObj.value));
      },
    });

    gsap.to(endObj, {
      value: endYear,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: () => {
        endNode.textContent = String(Math.round(endObj.value));
      },
    });

    prevValues.current = { startYear, endYear };
  }, [startYear, endYear]);

  return (
    <Container>
      <Lines />
      <TimelineOrbitNavigation
        setActiveCategory={setActiveCategory}
        activeCategoryData={activeCategoryData}
        timelineData={timelineData}
      />
      <div ref={startRef}>{startYear}</div>
      <div className="fuschia" ref={endRef}>
        {endYear}
      </div>
    </Container>
  );
};
export default TimelineHeader;
