import { FC, useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { type TimelineCategory } from "data/timelineData";

const CIRCLE_SIZE = 530;
const RADIUS = CIRCLE_SIZE / 2;
const DOT_ANGLES = [30, 90, 150, 210, 270, 330];

type TimelineOrbitNavigationProps = {
  activeCategoryData?: TimelineCategory;
  timelineData: Array<TimelineCategory>;
};

const OrbitCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(${RADIUS}px, 37.2vw, ${CIRCLE_SIZE}px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--color-line);
  transform: translate(-50%, -50%);
  z-index: 5;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const DotButton = styled.button<{ angle: number; radius: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0;
  border: none;
  cursor: pointer;

  transform: translate(-50%, -50%) rotate(${({ angle }) => angle}deg)
    translate(0, -${({ radius }) => radius}px);

  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-dark);
  z-index: 6;

  --dot-angle: ${({ angle }) => angle}deg;

  transition: width 0.25s ease, height 0.25s ease, background 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  .index {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(calc(-1 * var(--dot-angle)));
    font-size: 20px;
    color: var(--color-dark);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  &:hover {
    width: 56px;
    height: 56px;
    background: var(--color-bg);
    border: 1px solid var(--color-line);
  }

  &:hover .index {
    opacity: 1;
  }
`;

const TimelineOrbitNavigation: FC<TimelineOrbitNavigationProps> = ({
  timelineData,
  activeCategoryData,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(RADIUS);
  const count = Math.min(timelineData.length, DOT_ANGLES.length);

  useLayoutEffect(() => {
    function updateRadius() {
      if (!circleRef.current) return;
      const { height } = circleRef.current.getBoundingClientRect();
      setRadius(height / 2);
    }
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handleClick = () => {};

  return (
    <OrbitCircle ref={circleRef}>
      {Array.from({ length: count }).map((_, index) => {
        const angle = DOT_ANGLES[index];

        return (
          <DotButton
            key={timelineData[index].id}
            type="button"
            angle={angle}
            radius={radius}
            onClick={handleClick}
          >
            <span className="index">{index + 1}</span>
          </DotButton>
        );
      })}
    </OrbitCircle>
  );
};

export default TimelineOrbitNavigation;
