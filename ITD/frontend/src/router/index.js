import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "./../constants/routes";

import Home from "../pages/Home/";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import LineUpPage from "../pages/LineUp/LineUp";
import LineUpConfirmationPage from "../pages/LineUp/LineUpConfirmation";
import BookPage from "../pages/Book/Book";
import BookConfirmationPage from "../pages/Book/BookConfirmation";
import { stateContext } from "../context/stateContext";
import ManagerStores from "../pages/Manager/ManagerStores";
import ManagerScan from "../pages/Manager/ManagerScan";
import ManagerStore from "../pages/Manager/ManagerStore";

const Router = () => {
  const { currentUser } = useContext(stateContext);

  if (!currentUser || !currentUser.isManager) {
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
        <Route exact path={ROUTES.BOOK} component={BookPage} />
        <Route
          exact
          path={ROUTES.BOOK_CONFIRMATION}
          component={BookConfirmationPage}
        />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.SIGNUP} component={Signup} />
      <Route exact path={ROUTES.LOGOUT} component={Logout} />
      <Route exact path={ROUTES.MANAGER_STORES} component={ManagerStores} />
      <Route exact path={ROUTES.MANAGER_STORE} component={ManagerStore} />
      <Route exact path={ROUTES.MANAGER_SCAN} component={ManagerScan} />
    </Switch>
  );
};

export default Router;
