import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserItemList = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;
  cursor: pointer;

  &:hover {
    h2,
    h3 {
      color: #292929;
    }
  }
`;

export const UserItemImage = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`;

export const UserItemCard = styled.div`
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  overflow: hidden;
  background: white;
`;

export const UserItemInfo = styled.div`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-weight: normal;

  > h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: normal;
    color: #ffd900;
  }

  > h3 {
    margin: 0;
    color: #fff;
  }
`;

export const UserItemLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  background: #292929;

  &:hover {
    background: #ffd900;
    color: #292929;
  }

  &:active {
    background: #ffd900;
    color: #292929;
  }
`;
