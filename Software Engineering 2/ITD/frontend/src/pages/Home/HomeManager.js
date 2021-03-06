import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import * as ROUTES from "./../../constants/routes";
import ManagerStoresTable from "../../components/ManagerStoreTables";

const HomeManager = () => {
  return (
    <div>
      <div className={"title"}>
        <h2>CLup - Manager</h2>
        <p>
          The system designed for handling queues efficiently during the
          COVID-19 pandemic
        </p>
      </div>
      <div>
        <Link to={ROUTES.MANAGER_SCAN}>
          <Button>Scan tickets</Button>
        </Link>
        <Link to={ROUTES.MANAGER_STORES}>
          <Button>Check your stores</Button>
        </Link>
        <Link to={ROUTES.LINEUP}>
          <Button>Generate ticket</Button>
        </Link>
        <div className={"manager-extra"}>
          <h4>Your stores</h4>
          <ManagerStoresTable />
        </div>
      </div>
    </div>
  );
};

export default HomeManager;
