import { styled } from "styled-components";
import { CIRCLE_SIZE, RADIUS } from "../../config/timelineCircleLayoutConfig";

export const OrbitCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(${RADIUS}px, 37.2vw, ${CIRCLE_SIZE}px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--color-line);
  transform: translate(-50%, -50%);
  z-index: 5;

  --orbit-rotation: 0;

  @media (max-width: 1023px) {
    display: none;
  }
`;

type DotButtonProps = {
  $angle: number;
  $radius: number;
  $active: boolean;
  $showCategory: boolean;
};

export const DotButton = styled.button.attrs<DotButtonProps>(
  ({ $angle, $radius }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${$angle}deg) translate(0, -${$radius}px)`,
    },
  })
)<DotButtonProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $active }) => ($active ? 56 : 6)}px;
  height: ${({ $active }) => ($active ? 56 : 6)}px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 6;

  background: ${({ $active }) =>
    $active ? "var(--color-bg)" : "var(--color-dark)"};
  border: ${({ $active }) =>
    $active ? "1px solid var(--color-line)" : "none"};

  transition: width 0.25s ease, height 0.25s ease, background 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  --dot-angle: ${({ $angle }) => $angle};

  .index {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
      rotate(calc((var(--orbit-rotation) + var(--dot-angle)) * -1deg));
    font-size: 20px;
    color: var(--color-dark);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    pointer-events: none;
    transition: opacity 0.3s ease-out;

    .category {
      position: absolute;
      top: -5px;
      left: 50px;
      font-weight: bold;
      white-space: nowrap;
      opacity: ${({ $showCategory }) => ($showCategory ? 1 : 0)};
      transition: opacity 0.3s ease-out;
    }
  }

  &:hover {
    width: 56px;
    height: 56px;
    background: var(--color-bg);
    border: 1px solid var(--color-line);
  }

  &:hover .index {
    opacity: 1;
  }
`;
