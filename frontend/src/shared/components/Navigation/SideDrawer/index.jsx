import { Drawer } from "./styles";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

const SideDrawer = ({ children, onClick, show }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <Drawer onClick={onClick}>{children}</Drawer>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
