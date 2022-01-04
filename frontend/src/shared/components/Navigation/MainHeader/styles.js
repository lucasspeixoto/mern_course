import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  background: transparent;
  border-bottom: 0px groove #707070;
  box-shadow: 0 1px 2px #707070;
  padding: 0 1rem;
  z-index: 5;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;
