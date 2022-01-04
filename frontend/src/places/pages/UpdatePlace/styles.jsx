import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Form = styled.form`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const BackLink = styled(Link)`
  color: #1e409c;
  text-decoration: none;
`
