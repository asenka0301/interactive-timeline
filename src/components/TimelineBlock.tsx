import { FC, useState } from "react";
import { styled } from "styled-components";
import TimelineHeader from "./TimelineHeader";
import { CategoryId, TIMELINE_CATEGORIES } from "../data/timelineData";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineWrapper = styled(Column)``;

const TimelinePanel = styled(Column)`
  h2 {
    margin: 0 20px;
    padding: 0 0 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid var(--color-line);
  }
`;

const TimelineBlock: FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("cinema");

  const activeCategoryData = TIMELINE_CATEGORIES?.find(
    (item) => item.id === activeCategory
  );

  return (
    <TimelineWrapper>
      <TimelineHeader activeCategoryData={activeCategoryData} />
      <TimelinePanel>
        <h2>{activeCategoryData?.title}</h2>
        <div>Slider</div>
      </TimelinePanel>
    </TimelineWrapper>
  );
};

export default TimelineBlock;
