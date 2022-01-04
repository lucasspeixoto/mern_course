import React from "react";

import { Container } from "./styles";

const Card = ({ className, style, children }) => {
  return (
    <Container className={className} style={style}>
      {children}
    </Container>
  );
};

export default Card;
