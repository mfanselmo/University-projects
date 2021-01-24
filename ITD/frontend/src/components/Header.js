import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { stateContext } from "../context/stateContext";

import * as ROUTES from "./../constants/routes";

const ManagerHeader = () => {
  return (
    <div className={"header"}>
      <Link to={ROUTES.HOME}>CLup</Link>
      <Link to={ROUTES.LOGOUT}>Logout</Link>
    </div>
  );
};

const AuthenticedUserHeader = () => {
  return (
    <div className={"header"}>
      <Link to={ROUTES.HOME}>CLup</Link>
      <Link to={ROUTES.LOGOUT}>Logout</Link>
    </div>
  );
};

const AnonymousUserHeader = () => {
  return (
    <div className={"header"}>
      <div className={"title"}>
        <h1>
          <Link to={ROUTES.HOME}>CLup</Link>
        </h1>
      </div>
      <div className={"links"}>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.SIGNUP}>Sign up</Link>
      </div>
    </div>
  );
};

const Header = () => {
  const { currentUser } = useContext(stateContext);

  if (!currentUser) {
    return <AnonymousUserHeader />;
  }

  if (currentUser.isManager) {
    return <ManagerHeader />;
  } else {
    return <AuthenticedUserHeader />;
  }
};

export default Header;
