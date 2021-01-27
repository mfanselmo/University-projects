import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import * as ROUTES from "./../constants/routes";
import { requestTicket } from "./../api";
import { useHistory } from "react-router";

const LineUpModal = ({
  openModal,
  setOpenModal,
  selectedStoreId,
  setSelectedStoreId,
  availableStores,
  axios,
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleConfirm = () => {
    setLoading(true);
    requestTicket(axios, selectedStoreId).then((res) => {
      setSelectedStoreId(null);
      setOpenModal(false);
      setLoading(false);
      history.push(`${ROUTES.LINEUP}/${res.ticket_id}`);
    });

    // api call
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedStoreId(null);
  };

  const selectedStore = availableStores.find(
    (d) => d.store_id === selectedStoreId
  );

  if (!selectedStoreId) return <div></div>;
  return (
    <Modal
      title="Confirm lining up?"
      okText={"Confirm"}
      visible={openModal}
      onOk={handleConfirm}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      {selectedStore && (
        <div>
          <h3>{selectedStore.address}</h3>
          <p>
            Approximate waiting time: {selectedStore.estimated_waiting_time}{" "}
            minutes
          </p>
        </div>
      )}
    </Modal>
  );
};

export default LineUpModal;
