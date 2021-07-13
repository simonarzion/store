import React from "react";
import styled, { keyframes } from "styled-components";

const BounceAn = keyframes`
 to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
`;

const BouncingLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
`;

const BouncingBall = styled.div`
  width: 18px;
  height: 18px;
  background-color: #ef767a;
  border-radius: 50%;
  animation: ${BounceAn} 0.6s infinite alternate;

  :nth-child(2) {
    animation-delay: 0.2s;
  }

  :nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loading = () => {
  return (
    <BouncingLoader>
      <BouncingBall></BouncingBall>
      <BouncingBall></BouncingBall>
      <BouncingBall></BouncingBall>
    </BouncingLoader>
  );
};

export default Loading;
