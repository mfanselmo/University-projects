import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";

const StoresTable = ({
  axios,
  setSelectedStoreId,
  setOpenModal,
  availableStores,
  selectText,
}) => {
  const onSelectStore = (storeId) => {
    setSelectedStoreId(storeId);
    setOpenModal(true);
  };
  const columns = [
    // {
    //   title: "Store number",
    //   dataIndex: "store_id",
    //   key: "store_id",
    // },
    {
      title: "Address",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${text.address}`}
        >
          {text.address}
        </a>
      ),
    },
    {
      title: "Estimated wating time",
      dataIndex: "estimated_waiting_time",
      key: "estimated_waiting_time",
      render: (text) => `${text} minutes`,
    },
    {
      title: selectText,
      render: (_, doc) => (
        <Button onClick={() => onSelectStore(doc.store_id)}>Select</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={availableStores}
        columns={columns}
        rowKey={(doc) => doc.store_id}
        size={"middle"}
      />
    </div>
  );
};

export default StoresTable;
