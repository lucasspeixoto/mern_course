import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    margin: 1rem;
    a.active {
      background: #f8df00;
      border-color: #292929;
      color: #292929;
      border-radius: 15px;
    }
  }

  a {
    border: 1px solid transparent;
    color: #292929;
    text-decoration: none;
    padding: 0.5rem;

    &:hover {
      border-radius: 15px;
      background: #f8df00;
      border-color: #292929;
      color: #292929;
    }
  }

  button {
    cursor: pointer;
    border: 1px solid #292929;
    color: #292929;
    background: transparent;
    padding: 0.5rem;
    font: inherit;

    &:focus {
      outline: none;
    }

    &:hover {
      background: #292929;
      color: white;
    }
    &:active {
      background: #292929;
      color: white;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    li {
      margin: 0 0.5rem;
    }

    a {
      color: white;
      text-decoration: none;
    }

    button {
      border: 1px solid white;
      color: white;
      background: transparent;

      &:hover {
        background: #f8df00;
        color: #292929;
      }

      &:active {
        background: #f8df00;
        color: #292929;
      }
    }
  }
`;
