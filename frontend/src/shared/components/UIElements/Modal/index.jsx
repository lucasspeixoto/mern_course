import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./../Backdrop/index";
import { Container, ModalContent, ModalFooter } from "./styles";

const ModalOverlay = ({ style, header, onSubmit, footer, children }) => {
  const content = (
    <Container style={style}>
      <header>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>{footer}</ModalFooter>
      </form>
    </Container>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={0}>
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
