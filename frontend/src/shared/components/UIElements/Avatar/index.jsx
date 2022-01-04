import React from "react";

import "./styles.js";
import { AvatarImage, Container } from "./styles.js";

const Avatar = ({ className, style, image, alt, width }) => {
  return (
    <Container className={className} style={style}>
      <AvatarImage
        src={image}
        alt={alt}
        style={{ width: width, height: width }}
        loading="lazy"
      />
    </Container>
  );
};

export default Avatar;
