import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/global-styles";
import TimelineBlock from "./components/TimelineBlock";

const Main = styled.main`
  margin-top: 60px;
  h1 {
    max-width: 150px;
    padding-left: 20px;
    font-size: 20px;
    font-weight: bold;
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
