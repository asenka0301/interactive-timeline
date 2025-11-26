import { FC, useState } from "react";
import { styled } from "styled-components";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import { CategoryId, TIMELINE_CATEGORIES } from "../data/timelineData";
import TimelineSlider from "./TimelineSlider/TimelineSlider";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineWrapper = styled(Column)`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: var(--color-line);
    z-index: 0;
  }

  @media (max-width: 1023px) {
    &::after {
      display: none;
    }
  }
`;

const TimelinePanel = styled(Column)``;

const TimelineBlock: FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("cinema");
  const total = TIMELINE_CATEGORIES.length;

  const activeCategoryData = TIMELINE_CATEGORIES?.find(
    (item) => item.id === activeCategory
  );

  return (
    <TimelineWrapper>
      <TimelineHeader
        setActiveCategory={setActiveCategory}
        activeCategoryData={activeCategoryData}
        timelineData={TIMELINE_CATEGORIES}
      />
      <TimelinePanel>
        <TimelineSlider
          timelineData={TIMELINE_CATEGORIES}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          total={total}
        />
      </TimelinePanel>
    </TimelineWrapper>
  );
};

export default TimelineBlock;
