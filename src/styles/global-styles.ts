import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    --color-bg: #fff;
    --color-dark: #42567a;
    --color-blue: #3877ee;
    --color-iris-100: #5d5fef;
    --color-fuschia-100: #ef5dA8;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    margin: 0 auto;
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: var(--color-fuschia-100);
    background-color: var(--color-bg);
    border: 3px solid red;
  }
`;
