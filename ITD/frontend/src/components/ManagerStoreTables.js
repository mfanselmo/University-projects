import React, { useContext, useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { stateContext } from "../context/stateContext";
import { getStoresInfo } from "../api";
import * as ROUTES from "./../constants/routes";

const ManagerStoresTable = () => {
  const { axios } = useContext(stateContext);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const loadStores = async () => {
      getStoresInfo(axios).then((res) => {
        setStores(res.data);
      });
    };

    loadStores();
  }, [axios]);

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
      render: (text) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${text}`}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Customers inside",
      dataIndex: "people_in_store",
      key: "people_in_store",
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
