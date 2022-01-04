import React from "react";
import ReactDOM from "react-dom";

import { Container } from "./styles";

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <Container onClick={onClick}></Container>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
