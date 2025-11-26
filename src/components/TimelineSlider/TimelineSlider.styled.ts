import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 20px;

  .swiper-slide-active {
    pointer-events: auto;
    z-index: 10;
  }

  .swiper-slide .swiper-slide {
    pointer-events: auto !important;
    z-index: auto;
  }

  @media (max-width: 1023px) {
    margin-top: 0;
  }
`;

export const SlideInner = styled.div`
  width: 100%;
  height: 100%;
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
