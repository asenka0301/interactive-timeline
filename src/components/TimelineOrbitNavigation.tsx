import {
  Dispatch,
  FC,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CIRCLE_SIZE = 530;
const RADIUS = CIRCLE_SIZE / 2;
const DOT_ANGLES = [30, 90, 150, 210, 270, 330];

type TimelineOrbitNavigationProps = {
  activeCategoryData?: TimelineCategory;
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
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

  --orbit-rotation: 0;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const DotButton = styled.button<{
  angle: number;
  radius: number;
  $active: boolean;
  $showCategory: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $active }) => ($active ? 56 : 6)}px;
  height: 6px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--color-dark);
  cursor: pointer;
  z-index: 6;
  transform: translate(-50%, -50%) rotate(${({ angle }) => angle}deg)
    translate(0, -${({ radius }) => radius}px);
  transition: width 0.25s ease, height 0.25s ease, background 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  --dot-angle: ${({ angle }) => angle};

  .index {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
      rotate(calc((var(--orbit-rotation) + var(--dot-angle)) * -1deg));
    font-size: 20px;
    color: var(--color-dark);
    opacity: 0;
    pointer-events: none;

    .category {
      position: absolute;
      top: -5px;
      left: 50px;
      font-weight: bold;
      white-space: nowrap;
      opacity: ${({ $showCategory }) => ($showCategory ? 1 : 0)};
      transition: opacity 0.3s ease-out;
    }
  }

  ${({ $active }) =>
    $active &&
    `
      height: 56px;
      background: var(--color-bg);
      border: 1px solid var(--color-line);

      .index {
        opacity: 1;
      }
  `}
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
  setActiveCategory,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(RADIUS);
  const count = Math.min(timelineData.length, DOT_ANGLES.length);
  const rotationRef = useRef<number>(0);
  const prevIndexRef = useRef<number | null>(null);
  const [canShowCategory, setShowCategory] = useState<boolean>(true);

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

  useGSAP(
    () => {
      const circle = circleRef.current;
      if (!circle || !timelineData.length) return;

      const currentIndex = timelineData.findIndex(
        (cat) => cat.id === activeCategoryData?.id
      );
      if (currentIndex === -1) return;

      const baseAngle = DOT_ANGLES[currentIndex];
      const targetNoWrap = 30 - baseAngle;

      if (prevIndexRef.current === null) {
        rotationRef.current = targetNoWrap;
        gsap.set(circle, {
          duration: 0.7,
          rotate: targetNoWrap,
          transformOrigin: "50% 50%",
          "--orbit-rotation": targetNoWrap,
        });
        prevIndexRef.current = currentIndex;
        setShowCategory(true);
        return;
      }

      const currentRotation = rotationRef.current;

      const k = Math.round((currentRotation - targetNoWrap) / 360);
      const targetRotation = targetNoWrap + 360 * k;

      setShowCategory(false);

      gsap.to(circle, {
        duration: 0.7,
        rotate: targetRotation,
        "--orbit-rotation": targetNoWrap,
        ease: "power2.inOut",
        transformOrigin: "50% 50%",
        onComplete: () => {
          setShowCategory(true);
        },
      });

      rotationRef.current = targetRotation;
      prevIndexRef.current = currentIndex;
    },
    {
      dependencies: [activeCategoryData?.id, timelineData],
    }
  );

  const handleDotClick = (id: CategoryId) => {
    setActiveCategory(id);
  };

  return (
    <OrbitCircle ref={circleRef}>
      {Array.from({ length: count }).map((_, index) => {
        const angle = DOT_ANGLES[index];
        const isActive = activeCategoryData?.id === timelineData[index].id;

        return (
          <DotButton
            key={timelineData[index].id}
            type="button"
            angle={angle}
            radius={radius}
            id={timelineData[index].id}
            onClick={() => handleDotClick(timelineData[index].id)}
            $active={isActive}
            $showCategory={isActive && canShowCategory}
          >
            <span className="index">
              {index + 1}
              {isActive && canShowCategory && (
                <span className="category">{activeCategoryData.title}</span>
              )}
            </span>
          </DotButton>
        );
      })}
    </OrbitCircle>
  );
};

export default TimelineOrbitNavigation;
