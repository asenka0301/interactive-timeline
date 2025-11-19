import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/global-styles";

const Main = styled.main`
  padding: 40px 24px;
  font-size: 20px;
  font-weight: bold;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main>Исторические даты</Main>
    </>
  );
};

export default App;
