import { Button, Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AnonymousUserCheck from "../../components/AnonymousUserCheck";
import UserInfo from "../../components/UserInfo";
import * as ROUTES from "./../../constants/routes";

const HomePage = ({ currentUser }) => {
  return (
    <div>
      <div className={"title"}>
        <h2>CLup</h2>
        <p>
          The system designed for handling queues efficiently during the
          COVID-19 pandemic
        </p>
        <b>{currentUser ? currentUser.phoneNumber : ""}</b>
      </div>
      <div className={"links"}>
        <Button>
          <Link to={ROUTES.LINEUP}>Line up!</Link>
        </Button>
        {currentUser && (
          <Button>
            <Link to={ROUTES.BOOK}>Book a visit!</Link>
          </Button>
        )}
      </div>

      {currentUser && <UserInfo />}
      {!currentUser && (
        <div className={"anonymousUserExtra"}>
          <p>
            If you decide to <Link to={ROUTES.LOGIN}>login</Link> with your
            account, you can recieve sms notifications, as well as plan future
            visits
          </p>
          <AnonymousUserCheck />
        </div>
      )}
    </div>
  );
};

export default HomePage;
