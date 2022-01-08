import React, { useState } from "react";
import MainHeader from "../MainHeader";
import { Link } from "react-router-dom";
import {
  NavigationButton,
  NavigationContainer,
  NavigationDrawerContainer,
  Title,
} from "./styles";
import NavLinks from "./../NavLinks/index";

import SideDrawer from "./../SideDrawer/index";
import Backdrop from "../../UIElements/Backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <React.Fragment>
      {drawerIsOpen ? (
        <Backdrop onClick={() => setDrawerIsOpen(false)} />
      ) : null}
      <SideDrawer show={drawerIsOpen} onClick={() => setDrawerIsOpen(false)}>
        <NavigationDrawerContainer>
          <NavLinks />
        </NavigationDrawerContainer>
      </SideDrawer>

      <MainHeader>
        <NavigationButton onClick={() => setDrawerIsOpen(true)}>
          <span />
          <span />
          <span />
        </NavigationButton>

        <Title>
          <Link to="/">Your Places</Link>
        </Title>
        <NavigationContainer>
          <NavLinks />
        </NavigationContainer>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
