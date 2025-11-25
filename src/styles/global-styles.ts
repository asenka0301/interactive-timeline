import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    --color-bg: #f4f5f9;
    --color-dark: #42567a;
    --color-blue: #3877ee;
    --color-iris-100: #5d5fef;
    --color-fuschia-100: #ef5dA8;
    --color-line: #c2c8d4;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    font-size: 16px;
  }

  h1, h2, h3, p {
    margin: 0;
  }
  
  button {
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
  }

  body {
    min-width: 320px;
    margin: 0;
    padding: 0;
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: var(--color-dark);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
  }
  
 .swiper-pagination-bullet {
    background: var(--color-dark);
  }
`;
