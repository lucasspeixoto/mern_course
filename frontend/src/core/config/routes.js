import React from "react";

import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import UpdatePlace from "../../places/pages/UpdatePlace";
import UserPlaces from "../../places/pages/UserPlaces";
import Auth from "../../user/pages/Auth";

import Users from "../../user/pages/Users";
import { useAuth } from "../hooks/useAuth";
import NewPlace from "./../../places/pages/NewPlace";
import MainNavigation from "./../../shared/components/Navigation/MainNavigation/index";

export const AppRoutes = () => {
  const { isLogged } = useAuth();

  let routes = <></>;
  if (isLogged) {
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        {routes}
        {/* <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/places/new' element={<NewPlace />} />
          <Route path='/places/:placeId' element={<UpdatePlace />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
          </Routes> */}
      </main>
    </BrowserRouter>
  );
};
