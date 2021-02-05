import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { stateContext } from "../context/stateContext";

import * as ROUTES from "./../constants/routes";

const ManagerHeader = () => {
  return (
    <div className={"header"}>
      <h1>
        <Link id={"title"} data-testid={"clup"} to={ROUTES.HOME}>
          CLup
        </Link>
      </h1>
      <div className={"links"}>
        <Link to={ROUTES.LOGOUT}>Logout</Link>
      </div>
    </div>
  );
};

const AuthenticedUserHeader = () => {
  return (
    <div className={"header"}>
      <h1>
        <Link id={"title"} data-testid={"clup"} to={ROUTES.HOME}>
          CLup
        </Link>
      </h1>
      <div className={"links"}>
        <Link to={ROUTES.LOGOUT}>Logout</Link>
      </div>
    </div>
  );
};

const AnonymousUserHeader = () => {
  return (
    <div className={"header"}>
      <h1>
        <Link id={"title"} data-testid={"clup"} to={ROUTES.HOME}>
          CLup
        </Link>
      </h1>
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
