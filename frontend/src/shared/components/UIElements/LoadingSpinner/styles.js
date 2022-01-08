import styled, { keyframes } from "styled-components";

const animate = keyframes`
   0% {
    transform: rotate(0deg);
  }
 
  100% {
    transform: rotate(180deg);
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
`;

export const DualRing = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &::after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #f8df00;
    border-color: #f8df00 transparent #f8df00 transparent;
    animation: ${animate} 1.2s linear infinite;
  }
`;
