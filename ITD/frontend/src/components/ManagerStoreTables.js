import React, { useContext, useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { stateContext } from "../context/stateContext";
import { getAllStores } from "../api";
import * as ROUTES from "./../constants/routes";

const ManagerStoresTable = () => {
  const { axios, currentUser, currentUserData } = useContext(stateContext);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    const loadStores = async () => {
      getAllStores(axios).then((res) => {
        setStores(
          res.data.filter((d) =>
            currentUserData.managed_store.includes(d.store_id)
          )
        );
      });
    };
    if (currentUserData && currentUserData.managed_store[0]) loadStores();
  }, [axios, currentUserData]);

  const columns = [
    // {
    //   title: "Store number",
    //   dataIndex: "store_id",
    //   key: "store_id",
    // },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, doc) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${doc.location.address}`}
        >
          {doc.location.address}
        </a>
      ),
    },
    {
      title: "Customers inside",
      dataIndex: "current_customers",
      key: "current_customers",
    },
    {
      title: "View detail",
      render: (text, doc) => (
        <Link
          to={{
            pathname: `${ROUTES.MANAGER_STORES}/${doc.store_id}`,
            state: { storeInfo: doc },
          }}
        >
          <Button>View</Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={stores}
      columns={columns}
      rowKey={(doc) => doc.store_id}
      size={"middle"}
    />
  );
};

export default ManagerStoresTable;
