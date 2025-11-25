import { styled } from "styled-components";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import TimelineOrbitNavigation from "./TimelineOrbitNavigation";

type TimelineHeaderProps = {
  activeCategoryData?: TimelineCategory;
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 75px;
  padding: 96px 0;

  div {
    font-size: 3.5rem;
    font-size: clamp(3.5rem, 1.7000000000000002rem + 9vw, 12.5rem);
    font-weight: bold;
    color: var(--color-iris-100);
  }

  .fuschia {
    color: var(--color-fuschia-100);
  }

  @media (max-width: 1023px) {
    justify-content: space-between;
    gap: 0;
    padding: 56px 20px;
  }
`;

const Lines = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: var(--color-line);
  }

  &::before {
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
  }

  &::after {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

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
