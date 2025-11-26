import {
  Dispatch,
  FC,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { type CategoryId, type TimelineCategory } from "data/timelineData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { OrbitCircle, DotButton } from "./TimelineOrbitNavigation.styled";

const CIRCLE_SIZE = 530;
const RADIUS = CIRCLE_SIZE / 2;
const CIRCLE_DEGREES = 360;

type TimelineOrbitNavigationProps = {
  activeCategoryData?: TimelineCategory;
  timelineData: Array<TimelineCategory>;
  setActiveCategory: Dispatch<SetStateAction<CategoryId>>;
};

const TimelineOrbitNavigation: FC<TimelineOrbitNavigationProps> = ({
  timelineData,
  activeCategoryData,
  setActiveCategory,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(RADIUS);
  const count = timelineData.length;
  const angleStep = CIRCLE_DEGREES / count;
  const startAngle = angleStep / 2;
  const rotationRef = useRef<number>(0);
  const prevIndexRef = useRef<number | null>(null);
  const [canShowCategory, setShowCategory] = useState<boolean>(true);
  const angles = timelineData.map((_, i) => startAngle + i * angleStep);

  useLayoutEffect(() => {
    function updateRadius() {
      if (!circleRef.current) return;
      const height = parseFloat(
        window.getComputedStyle(circleRef.current).width
      );
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

      const baseAngle = angles[currentIndex];
      const targetNoWrap = startAngle - baseAngle;

      if (prevIndexRef.current === null) {
        rotationRef.current = targetNoWrap;
        gsap.set(circle, {
          duration: 1,
          rotate: targetNoWrap,
          transformOrigin: "50% 50%",
          "--orbit-rotation": targetNoWrap,
        });
        prevIndexRef.current = currentIndex;
        setShowCategory(true);
        return;
      }

      const currentRotation = rotationRef.current;

      const k = Math.round((currentRotation - targetNoWrap) / CIRCLE_DEGREES);
      const targetRotation = targetNoWrap + CIRCLE_DEGREES * k;

      setShowCategory(false);

      gsap.to(circle, {
        duration: 1,
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
        const angle = angles[index];
        const isActive = activeCategoryData?.id === timelineData[index].id;

        return (
          <DotButton
            key={timelineData[index].id}
            type="button"
            $angle={angle}
            $radius={radius}
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
