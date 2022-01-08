import styled from "styled-components";
import { Link } from "react-router-dom";

export const AsHref = styled.a`
  font-size: ${(props) => (props.size === "small" ? "0.8rem" : "1.5rem")}
  font: inherit;
  padding: 0.5rem 1.5rem;
  border-color: ${(props) => props.danger && "#830000"};
  border-radius: 4px;
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};     
  color: ${(props) => (props.inverse ? "#ff0055" : "#fff")}
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;

  &:focus {
  outline: none;
}

 &:hover {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"}; 
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
  color: ${(props) => props.inverse && "#fff"};
 }
 &:active {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
 }

 &:disabled {
  background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
 }
`;

export const AsLink = styled(Link)`
  font-size: ${(props) => (props.size === "small" ? "0.8rem" : "1.5rem")}
  font: inherit;
  padding: 0.5rem 1.5rem;
  border-color: ${(props) => props.danger && "#830000"};
  border-radius: 4px;
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};     
  color: ${(props) => (props.inverse ? "#ff0055" : "#fff")}
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;

  &:focus {
  outline: none;
}

 &:hover {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"}; 
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
  color: ${(props) => props.inverse && "#fff"};
 }
 &:active {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
 }

 &:disabled {
  background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
 }
`;

export const AsButton = styled("button")`
  font-size: ${({ size }) => (size === "small" ? "0.8rem" : "1.5rem")}
  font: inherit;
  padding: 0.5rem 1.5rem;
  border-color: ${(props) => props.danger && "#830000"};
  border-radius: 4px;
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};     
  color: ${(props) => (props.inverse ? "#ff0055" : "#fff")}
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;

  &:focus {
  outline: none;
}

 &:hover {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"}; 
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
  color: ${(props) => props.inverse && "#fff"};
 }
 &:active {
  background: ${(props) => props.danger && "#830000"};${(props) =>
  props.inverse ? "transparent" : "#ff0055"};
  border-color: ${(props) => (props.danger ? "#830000" : "#ff4382")};
 }

 &:disabled {
  background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
 }
`;
