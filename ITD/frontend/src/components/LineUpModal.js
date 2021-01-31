import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import * as ROUTES from "./../constants/routes";
import { requestTicket } from "./../api";
import { useHistory } from "react-router";
import { message, Form, Input } from "antd";

const LineUpModal = ({
  openModal,
  setOpenModal,
  selectedStoreId,
  setSelectedStoreId,
  availableStores,
  axios,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    currentUser ? currentUser.phoneNumber : null
  );
  const history = useHistory();

  const handleConfirm = () => {
    if (!userPhoneNumber) {
      message.error("You must enter a phone number!");
      return;
    }

    const pattern = new RegExp("^[+]{1}[3]{1}[9]{1}[3]{1}[-s./0-9]{9}$", "i");
    if (!userPhoneNumber.match(pattern)) {
      message.error(
        "Make sure your phone number matches the format 3xxxxxxxxx"
      );
      return;
    }

    setLoading(true);
    requestTicket(axios, selectedStoreId, userPhoneNumber)
      .then((res) => {
        console.log(res);
        setSelectedStoreId(null);
        setOpenModal(false);
        setLoading(false);
        history.push(`${ROUTES.LINEUP}/${res.data.ticket_id}`);
      })
      .catch((err) => {
        if (err.response) {
          console.log("err", err.response);
          if (err.response.data.message)
            message.error(err.response.data.message);
          else message.error("Unexpected error");
        }
        setLoading(false);
      });
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
          {!currentUser && (
            <>
              <p>Enter your phone number</p>
              <Input
                addonBefore={"+39"}
                onChange={(e) =>
                  setUserPhoneNumber(`+39${e.target.value.replace(/\D/g, "")}`)
                }
              />
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default LineUpModal;
