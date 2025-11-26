import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 75px;
  padding: 96px 0;

  div {
    font-size: 3.5rem;
    font-size: clamp(3.5rem, 1.7000000000000002rem + 9vw, 12.5rem);
    font-weight: bold;
    color: var(--color-iris-100);
  }

  .fuschia {
    color: var(--color-fuschia-100);
  }

  @media (max-width: 1023px) {
    justify-content: space-between;
    gap: 0;
    padding: 56px 20px;
  }
`;

export const Lines = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: var(--color-line);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;
