import { styled } from "styled-components";
import { FC, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type TimelineCategory } from "data/timelineData";

type TimelineHeaderProps = {
  activeCategoryData?: TimelineCategory;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 56px 20px;

  div {
    font-size: 56px;
    font-weight: bold;
    color: var(--color-blue);
  }

  .fuschia {
    color: var(--color-fuschia-100);
  }
`;

const TimelineHeader: FC<TimelineHeaderProps> = ({ activeCategoryData }) => {
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
      <div ref={startRef}>{startYear}</div>
      <div className="fuschia" ref={endRef}>
        {endYear}
      </div>
    </Container>
  );
};
export default TimelineHeader;
