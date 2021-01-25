import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "./../constants/routes";

import Home from "../pages/Home/";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import LineUpPage from "../pages/LineUp/LineUp";
import LineUpConfirmationPage from "../pages/LineUp/LineUpConfirmation";
// import { stateContext } from "../context/stateContext";

const Router = () => {
  //const { currentUser } = useContext(stateContext);

  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.SIGNUP} component={Signup} />
      <Route exact path={ROUTES.LOGOUT} component={Logout} />
      <Route exact path={ROUTES.LINEUP} component={LineUpPage} />
      <Route
        exact
        path={ROUTES.LINEUP_CONFIRMATION}
        component={LineUpConfirmationPage}
      />
    </Switch>
  );
};

export default Router;
