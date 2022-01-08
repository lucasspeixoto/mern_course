import React from "react";

import "./Button.css";
//import { AsHref, AsLink, AsButton } from "./styles";
import { Link } from "react-router-dom";

const Button = ({
  href,
  size,
  inverse,
  danger,
  to,
  exact,
  type,
  onClick,
  disabled,
  children,
}) => {
  if (href) {
    return <a href={href}>{children}</a>;
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
