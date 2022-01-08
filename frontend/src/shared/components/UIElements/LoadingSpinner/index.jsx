import React from "react";
import { Container, DualRing } from "./styles";

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <Container className={`${asOverlay}`}>
      <DualRing />
    </Container>
  );
};

export default LoadingSpinner;
