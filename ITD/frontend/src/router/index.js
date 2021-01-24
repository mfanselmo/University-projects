import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "./../constants/routes";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
// import { stateContext } from "../context/stateContext";

const Router = () => {
  //const { currentUser } = useContext(stateContext);

  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.SIGNUP} component={Signup} />
      <Route exact path={ROUTES.LOGOUT} component={Logout} />
    </Switch>
  );
};

export default Router;
