import { FC, useState } from "react";
import { styled } from "styled-components";
import TimelineHeader from "./TimelineHeader";
import { CategoryId, TIMELINE_CATEGORIES } from "../data/timelineData";
import TimelineSlider from "./TimelineSlider";

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

const TimelinePanel = styled(Column)`
  h2 {
    display: none;
    margin: 0 20px;
    padding: 0 0 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid var(--color-line);
  }

  @media (max-width: 1023px) {
    h2 {
      display: block;
    }
  }
`;

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
        <h2>{activeCategoryData?.title}</h2>
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
