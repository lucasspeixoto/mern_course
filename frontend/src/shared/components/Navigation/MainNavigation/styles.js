import styled from "styled-components";

export const NavigationButton = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;

  > span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: white;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h1`
  color: white;

  > a {
    text-decoration: none;
    color: white;
  }
`;

export const NavigationContainer = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const NavigationDrawerContainer = styled.nav`
  height: 100%;
`;
