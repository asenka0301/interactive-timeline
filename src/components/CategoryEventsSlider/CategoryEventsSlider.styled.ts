import { styled } from "styled-components";
import arrowLeft from "../../assets/icons/arrow-left_blue_8x12.svg";
import arrowRight from "../../assets/icons/arrow-right_blue-8x12.svg";

export const InnerSwiperWrapper = styled.div`
  position: relative;
  padding: 130px 80px 20px;

  .container {
    position: relative;
    .navigation-btn {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: 2;

      .arrow-icon {
        display: inline-block;
        background-size: cover;
        background-repeat: no-repeat;
        width: 8px;
        height: 12px;
      }

      &:hover {
        box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);
      }
      &:disabled {
        display: none;
      }
    }

    .navigation-btn.prev {
      left: -60px;
      .arrow-icon {
        background-image: url(${arrowLeft});
      }
    }

    .navigation-btn.next {
      right: -50px;
      .arrow-icon {
        background-image: url(${arrowRight});
      }
    }
  }

  @media (max-width: 1023px) {
    padding: 20px 0 60px 20px;

    div {
      navigation-btn {
        display: none;
      }
    }
  }
`;

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  cursor: pointer;

  h3 {
    color: var(--color-blue);
    font-size: 25px;
    font-weight: 700;
    white-space: nowrap;
  }

  .description {
    margin: 0;
    font-size: 20px;
  }

  @media (max-width: 1023px) {
    max-width: 170px;

    h3 {
      font-size: 16px;
    }
    .description {
      font-size: 14px;
    }
  }
`;
