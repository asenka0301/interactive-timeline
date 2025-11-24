import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/global-styles";
import TimelineBlock from "./components/TimelineBlock";

const Main = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 100px;
  border-right: 1px solid var(--color-line);
  border-left: 1px solid var(--color-line);

  h1 {
    max-width: 350px;
    padding-left: 78px;
    font-size: 1.25rem;
    font-size: clamp(
      1.25rem,
      0.6071428571428572rem + 3.214285714285714vw,
      3.5rem
    );
    border: 10px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
  }
  @media (max-width: 1023px) {
    border: 0;
    h1 {
      max-width: 150px;
      padding-left: 20px;
      border: 0;
    }
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main>
        <h1>Исторические даты</h1>
        <TimelineBlock />
      </Main>
    </>
  );
};

export default App;
